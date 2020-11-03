const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const pug = require("pug");
const sendMail = require("../../controller/mailController");
const jwt = require("jsonwebtoken");
const Customer = require("../../models/customer");
const Admin = require("../../models/admin");
const config = require("../../config/default.json");
const { AES } = require("crypto-js");

const router = Router();

/* 
Route : /api/admin/register
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
      admin = new Admin({
        name,
        email,
        password,
        role,
        emailToken,
      });
      await admin.save();
      // Send verification email
      const verifyURL = `http://localhost:3000/api/admin/verify/${emailToken}`;
      const subject = "Email Verification - XYZ Solutions";
      const html = pug.renderFile(__dirname + "/email.pug", {
        name,
        verifyURL,
      });
      await sendMail(subject, email, html);
      // Create JWT token for authentication
      const payload = {
        admin: admin._id,
        role: admin.role,
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
    const data = await Admin.findOneAndUpdate({ emailToken }, { active: true });
    res.send(`<h1>${data.email} is successfully verified</h1>`);
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

/* Exports */
module.exports = router;
