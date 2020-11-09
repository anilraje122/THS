var express = require("express");
const Users = require("../models/Users");
var router = express.Router();
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Sign up UI route*/
router.get("/register", (req, res) => {
  res.render("reg");
});

/* Sign up API route */
router.post("/register", async (req, res) => {
  let { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const userData = new Users(req.body);
    await userData.save();
    res.redirect("/users/login");
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

/* Login UI route*/
router.get("/login", (req, res) => {
  res.render("login", { display: false });
});

/* Login API route */
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    const userData = await Users.findOne({ email });
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
    res.redirect("/");
  } catch (err) {}
});

module.exports = router;
