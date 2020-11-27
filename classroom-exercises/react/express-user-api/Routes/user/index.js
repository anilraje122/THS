const express = require("express");
const router = express.Router();
const { hash, genSalt } = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../../Models/User");

/* 
POST route
Path: /api/user/register
*/
router.post(
  "/register",
  [
    body("fname", "First name is required").notEmpty(),
    body("lname", "Last name is required").notEmpty(),
    body("password", "Password must be 6 characters long").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Errors: errors.array() });
    }
    let { fname, lname, password } = req.body;
    const user = await User.findOne({ fname });
    // Check if user already exist
    if (user) {
      return res.status(400).json({ Error: "User already exist" });
    }
    // hash password
    const salt = await genSalt(10);
    password = await hash(password, salt);
    const newUser = new User({
      fname,
      lname,
      password,
    });
    // Save new user details to DB
    await newUser.save();
    res.status(200).json({ Success: "User registerd successfully" });
  }
);

module.exports = router;
