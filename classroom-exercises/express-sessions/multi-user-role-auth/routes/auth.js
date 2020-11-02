const express = require("express");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
const { body, validationResult } = require("express-validator");
const { AES } = require("crypto-js");

const router = express.Router();

const Admin = require("../models/Admin");
const Customer = require("../models/Customer");

/* 
Route: /api/auth
Description: custmer/admin login
Public Route
*/
router.post(
  "/",
  [
    body("email", "Please enter valid email").isEmail(),
    body("password", "Password is required").notEmpty().isLength({ min: 6 }),
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
        const isMatch = await compare(password, customer.password);
        if (!isMatch) {
          return res.status(400).json({ Error: "Invalid password!" });
        }
        // Create JWT access token for customer
        const payload = {
          customer: customer._id,
          role: customer.role,
        };
        const token = await jwt.sign(payload, config.JWT.SECRET_KEY, {
          expiresIn: 30,
        });
        const cipherToken = AES.encrypt(
          token,
          config.CRYPTO.SECRET_KEY
        ).toString();
        return res.status(200).json({ token: cipherToken });
      } else if (admin) {
        const isMatch = await compare(password, admin.password);
        if (!isMatch) {
          return res.status(400).json({ Error: "Invalid password!" });
        }
        // Create JWT access token for admin
        const payload = {
          admin: admin._id,
          role: admin.role,
        };
        const token = await jwt.sign(payload, config.JWT.SECRET_KEY, {
          expiresIn: 30,
        });
        const cipherToken = AES.encrypt(
          token,
          config.CRYPTO.SECRET_KEY
        ).toString();
        return res.status(200).json({ token: cipherToken });
      } else {
        res.status(400).json({"Error": "Invalid email address"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Server error" });
    }
  }
);

module.exports = router;
