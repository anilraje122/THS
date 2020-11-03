const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
const { AES } = require("crypto-js");
const bcrypt = require("bcrypt");

const router = Router();

const Customer = require("../models/customer");
const Admin = require("../models/admin");

/* 
Route : /api/auth
Description : User login
Public Route
*/
router.post(
  "/",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const customer = await Customer.findOne({ email });
      const admin = await Admin.findOne({ email });
      if (customer) {
        const isValid = await bcrypt.compare(password, customer.password);
        if (!isValid) {
          return res.status(400).json({ Error: "Invalid password" });
        }
        // Create jwt token
        const payload = {
          customer: customer._id,
          role: customer.role,
        };
        const token = await jwt.sign(payload, config.JWT.SECRET);
        const cipherToken = AES.encrypt(token, config.CRYPTO.SECRET_KEY).toString();
        return res.status(200).json({token: cipherToken});
      } else if (admin) {
        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
          return res.status(400).json({ Error: "Invalid password" });
        }
        // Create jwt token
        const payload = {
          admin: admin._id,
          role: admin.role,
        };
        const token = await jwt.sign(payload, config.JWT.SECRET);
        const cipherToken = AES.encrypt(token, config.CRYPTO.SECRET_KEY).toString();
        return res.status(200).json({token: cipherToken});
      } else {
        res.status(400).json({ Error: "Invalid email" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Server Error" });
    }
  }
);

module.exports = router;
