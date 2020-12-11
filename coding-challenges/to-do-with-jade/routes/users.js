var express = require("express");
const User = require("../models/User");
var router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Sign up UI route*/
router.get("/signup", (req, res) => {
  res.render("reg");
});

/* Sign up API route */
router.post(
  "/signup",
  [
    body("fullName", "Invalid name").notEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("error", {
        message: "Required field missing",
        error: {
          status: 400,
          stack: JSON.stringify(errors.array()),
        },
      });
    }
    try {
      let { password, email } = req.body;
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
      const userData = await User.findOne({ email });
      if (userData) {
        return res.render("error", {
          message: "User already exist with same email",
          error: {
            status: 400,
            stack: "",
          },
        });
      }
      const newUser = new User(req.body);
      await newUser.save();
      res.redirect("/users/login");
    } catch (err) {
      console.log(err);
      res.render("error", {
        message: "Server Error",
        error: {
          status: 500,
          stack: "",
        },
      });
    }
  }
);

/* Login UI route*/
router.get("/login", (req, res) => {
  res.render("login", { display: false });
});

/* Login API route */
router.post(
  "/login",
  [
    body("email", "Email is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("error", {
        message: "Required field missing",
        error: {
          status: 400,
          stack: JSON.stringify(errors.array()),
        },
      });
    }
    try {
      let { email, password } = req.body;
      const userData = await User.findOne({ email });
      if (!userData) {
        res.render("login", {
          display: true,
          msg: "Login failed! Invalid Email",
        });
      }
      const isValid = await bcrypt.compare(password, userData.password);
      if (!isValid) {
        res.render("login", {
          display: true,
          msg: "Login failed! Incorrect password",
        });
      }
      res.redirect("/todo");
    } catch (err) {
      res.render("error", {
        message: "Server Error",
        error: {
          status: 500,
          stack: "",
        },
      });
    }
  }
);

module.exports = router;
