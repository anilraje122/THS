const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const pug = require("pug");

const router = Router();
const Customer = require("../../models/customer");
const Admin = require("../../models/admin");

/* 
Register new customer - POST
Public Route
*/
router.post(
  "/register",
  [
    body("name", "Invalid name").isString(),
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").isString(),
    body("role", "Invalid role").isString(),
  ],
  async (req, res) => {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { name, email, password, role } = req.body;
      let customer = await Customer.findOne({ email });
      let admin = await Customer.findOne({ email });
      // Check if user already exist
      if (customer) {
        return res
          .status(400)
          .json({ Error: "Email already registered as Customer" });
      }
      if (admin) {
        return res
          .status(400)
          .json({ Error: "Email already registered as Admin" });
      }
      // Hash password
      const saltRounds = 10;
      const salt = bcrypt.genSalt(saltRounds);
      password = bcrypt.hash(password, salt);
      // Generate email token and save customer data to database
      const emailToken = randomstring.generate();
      customer = new Customer({
        name,
        email,
        password,
        role,
        emailToken,
      });
      await customer.save();
      // Send verification email
      const verifyURL = `http://localhost:3000/api/customer/verify/${emailToken}`;
      const subject = "Email Verification - XYZ Solutions";
      const html = pug.renderFile(__dirname + "/email.pug", {
        name,
        verifyURL,
      });
    } catch (err) {}
  }
);

/* Exports */
module.exports = router;
