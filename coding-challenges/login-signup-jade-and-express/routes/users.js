var express = require("express");
var router = express.Router();

/* Imports */
const { body, validationResult } = require("express-validator");
const Users = require("../models/users");
const Admins = require("../models/admins");
const bcrypt = require("bcrypt");
const config = require("../config/default.json");
const jwt = require("jsonwebtoken");
const helper = require("../helper");

/* UI Routes */

/* Users Login - UI */
router.all("/login", (req, res) => {
  res.render("login");
});

/* Users Sign up - UI */
router.all("/signup", (req, res) => {
  res.render("signup");
});


/* API Routes */

/* User sign up - API */
router.all(
  "/dosignup",
  [
    body("firstName", "Invalid First Name").notEmpty().isString(),
    body("lastName", "Invalid Second Name").isString(),
    body("email", "Invalid Email").notEmpty().isEmail(),
    body("role", "Please select a user role").notEmpty(),
    body("password", "Invalid Password").notEmpty().isLength({ min: 6 }),
    body("password2", "Password does not match").custom((val, { req }) => {
      if (val === req.body.password) {
        return true;
      } else {
        return false;
      }
    }),
  ],
  async (req, res) => {
    
    // Input validation
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.render("custom-alert", {
        customAlert: {
          title: "Error",
          statusCode: 400,
          message: "Validation Failed, Pease check the input fields!",
          type: "alert-danger",
        },
      });
    }
    try {
      const { email, role } = req.body;
      const existingUser = await Users.findOne({ email: email });
      const existingAdmin = await Users.findOne({ email: email });
      
      // Check for existing user/admin
      if (existingUser || existingAdmin) {
        return res.render("custom-alert", {
          customAlert: {
            title: "Error",
            statusCode: 400,
            message: "User already exist with same email!",
            type: "alert-danger",
          },
        });
      }

      // Decide which model to use as per the user role input
      const selectedUser = role === 'user' ? new Users(req.body) : new Admins(req.body);

      // Hash password, create token and update the database
      selectedUser.password = await bcrypt.hash(selectedUser.password, 10);
      selectedUser.accessToken = await helper.createJwtToken(selectedUser);
      selectedUser.save();

      res.render("custom-alert", {
        customAlert: {
          title: "Success",
          statusCode: 200,
          message:
            "User Registered Successfully, Please verify your email. Check your inbox for the verify link.",
          type: "alert-success",
        },
      });

      // Send email verification link to user
      const emailBody = `<p>Welcome to XYZ Solution. Please verify your email by clicking below link</p>
                        <b><a href="http://localhost:3000/users/doverify/${selectedUser.role}/${selectedUser.accessToken}">Click here to verify</a></b>`;
      await helper.sendEmail(
        '"XYZ Solutions" <admin@anilraj.space>',
        selectedUser.email,
        "Welcome to XYZ Solutions - Email Verification",
        emailBody
      );
    } catch (err) {
      console.log(err);
      return res.render("custom-alert", {
        customAlert: {
          title: "Error",
          statusCode: 500,
          message: "Server Error. Something went wrong!",
          type: "alert-danger",
        },
      });
    }
  }
);

/* User login - API */
router.all(
  "/dologin",
  [
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "Enter a valid password").notEmpty(),
  ],
  async (req, res) => {

    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("custom-alert", {
        customAlert: {
          title: "Error",
          statusCode: 400,
          message: "Validation Failed, Pease check the input fields!",
          type: "alert-danger",
        },
      });
    }

    try {
      const {email, password} = req.body;
      const isAdmin = req.body.isAdmin !== undefined ? true : false;
      
      // Collect user data as per the role
      if(isAdmin) {
        existingUserData = await Admins.findOne({ email: email });
        selectedUser = Admins;
      } else {
        existingUserData = await Users.findOne({ email: email });
        selectedUser = Users;
      }

      // Check if user exist
      if (!existingUserData) {
        return res.render("custom-alert", {
          customAlert: {
            title: "Error",
            statusCode: 400,
            message: "Auth Failed! Invalid Email",
            type: "alert-danger",
          },
        });
      }

      // Check if user verified email
      if(!existingUserData.verified) {
        return res.render("custom-alert", {
          customAlert: {
            title: "Error",
            statusCode: 400,
            message: "Auth Failed! User did not verify the email address",
            type: "alert-danger",
          },
        });
      }

      // Check password
      const isValidUser = await bcrypt.compare(password, existingUserData.password);
      console.log(isValidUser);
      if (!isValidUser) {
        return res.render("custom-alert", {
          customAlert: {
            title: "Error",
            statusCode: 400,
            message: "Auth Failed! Invalid password",
            type: "alert-danger",
          },
        });
      }
      console.log(existingUserData);
      res.render("user-home.jade", {userData: existingUserData});
    } catch (err) {

    }
    
  }
);

/* Verify email - API */
router.all("/doverify/:selectedRole/:token", async (req, res) => {
  try {
    const {selectedRole, token} = req.params;
    let selectedUser = {};
    let existingUserData = {};
    // Collect user data as per the role
    if(selectedRole === 'user') {
      existingUserData = await Users.findOne({ accessToken: token });
      selectedUser = Users;
    } else {
      existingUserData = await Admins.findOne({ accessToken: token });
      selectedUser = Admins;
    }

    // Check if user already verified
    if (existingUserData.verified) {
      return res.render("custom-alert", {
        customAlert: {
          title: "Success",
          statusCode: 200,
          message: "Email is already verified!",
          type: "alert-success",
        },
      });
    }

    // Check if token is already expired
    await jwt.verify(token, config.JWT.KEY, async (err) => {
      if (err) {
        return res.render("token-expired-alert", { role: selectedRole, token: token });
      }
      // Update DB : Set verified = True
      await selectedUser.findOneAndUpdate({ accessToken: token }, { verified: true });

      res.render("custom-alert", {
        customAlert: {
          title: "Success",
          statusCode: 200,
          message: "Email successfully verified!",
          type: "alert-success",
        },
      });
    });
  } catch (err) {
    console.log(err);
    return res.render("custom-alert", {
      customAlert: {
        title: "Error",
        statusCode: 500,
        message: "Server Error. Something went wrong!",
        type: "alert-danger",
      },
    });
  }
});

/* Resend verification email - API*/
router.all("/resendverification/:selectedRole/:token", async (req, res) => {
  const {selectedRole, token} = req.params;
  let selectedUser = {};
  let existingUserData = {};

  // Collect user data as per the role
  if(selectedRole === 'user') {
    existingUserData = await Users.findOne({ accessToken: token });
    selectedUser = Users;
  } else {
    existingUserData = await Admins.findOne({ accessToken: token });
    selectedUser = Admins;
  }

  try {
    // create new jwt token
    const key = config.JWT.KEY;
    const payload = {
      user: {
        id: existingUserData._id,
      },
    };
    const newToken = await jwt.sign(payload, key, { expiresIn: 60 });

    // update new token in user schema
    await selectedUser.findOneAndUpdate(
      { email: existingUserData.email },
      { accessToken: newToken }
    );

    // resend email verification link to user
    const emailBody = `<p>Welcome to XYZ Solution. Please verify your email by clicking below link</p>
    <b><a href="http://localhost:3000/users/doverify/${selectedRole}/${newToken}">Click here to verify</a></b>`;
    await helper.sendEmail(
      '"XYZ Solutions" <admin@anilraj.space>',
      existingUserData.email,
      "Welcome to XYZ Solutions - Email Verification",
      emailBody
    );

    // send success alert
    res.render("custom-alert", {
      customAlert: {
        title: "Success",
        statusCode: 200,
        message: "Email verification re-sent successfully, Check your inbox",
        type: "alert-success",
      },
    });
  } catch (err) {
    console.log(err);
    return res.render("custom-alert", {
      customAlert: {
        title: "Error",
        statusCode: 500,
        message: "Server Error. Something went wrong!",
        type: "alert-danger",
      },
    });
  }
});

module.exports = router;
