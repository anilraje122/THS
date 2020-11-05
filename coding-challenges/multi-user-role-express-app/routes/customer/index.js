const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const pug = require("pug");
const sendMail = require("../../controller/mailController");
const jwt = require("jsonwebtoken");
const Customer = require("../../models/customer");
const Admin = require("../../models/admin");
const CustomerProfile = require("../../models/customerProfile");
const config = require("../../config/default.json");
const { AES } = require("crypto-js");
const authMiddleware = require("../../controller/authMiddleware");

const router = Router();

/* 
Route : /api/customer/register
Description : Register new customer
Public Route
*/
router.post(
  "/register",
  [
    body("name", "Invalid name").isString().notEmpty(),
    body("email", "Invalid email").isEmail().notEmpty(),
    body("password", "Invalid password").isLength({ min: 6 }),
    body("role", "Invalid role").isString().notEmpty(),
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
      let admin = await Admin.findOne({ email });
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
      const salt = await bcrypt.genSalt(saltRounds);
      password = await bcrypt.hash(password, salt);
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
      await sendMail(subject, email, html);
      // Create JWT token for authentication
      const payload = {
        customer: customer._id,
        role: customer.role,
      };
      const token = await jwt.sign(payload, config.JWT.SECRET, {
        expiresIn: 60,
      });
      const cipherToken = AES.encrypt(
        token,
        config.CRYPTO.SECRET_KEY
      ).toString();
      res.status(200).json({ token: cipherToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Server Error" });
    }
  }
);

/* 
Route : /api/customer/verify
Description : Verify email for customer
Public Route
*/
router.get("/verify/:emailToken", async (req, res) => {
  try {
    const emailToken = req.params.emailToken;
    const data = await Customer.findOneAndUpdate(
      { emailToken },
      { active: true }
    );
    res.send(`<h1>${data.email} is successfully verified</h1>`);
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

/* 
Route : /api/customer/delete
Description : Delete customer account
private Route
*/
router.delete("/delete", authMiddleware, async (req, res) => {
  const customer = await Customer.findById(req.customer.customer);
  console.log(req.customer.customer);
  const customerProfile = await CustomerProfile.findOne({
    customer: req.customer.customer,
  });
  // console.log(customer);
  console.log(customerProfile);
  res.send("end");
});

/* Exports */
module.exports = router;
