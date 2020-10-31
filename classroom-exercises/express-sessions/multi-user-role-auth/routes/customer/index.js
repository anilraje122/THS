const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body,validationResult } = require('express-validator');
// const config = require('../../config/default.json');
const randomstring = require('randomstring');
const mailController = require('../../controllers/mailController');

/* Import models */
const Customer = require('../../models/Customer');
const Admin = require('../../models/Admin');

const router = express.Router();

/* 
Route: /api/customer/register
Description: Register new customer
Public Route
*/
router.post("/register", [
  body('name', 'Please enter valid name').notEmpty().isString(),
  body('email', 'Please enter valid email').isEmail(),
  body('role', 'Role is required').notEmpty().isString(),
  body('password', 'Password is required').notEmpty().isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    const { name, email, role } = req.body;  

    // check if admin/customer exist
    let customer = await Customer.findOne({email}); // same as {email: email}
    let admin = await Admin.findOne({email}); // same as {email: email}
    if(customer) {
      return res.status(500).json({"Error": `${email} is already registered as customer!`})
    }
    if(user) {
      return res.status(500).json({"Error": `${email} is already registered as Admin!`})
    }

    // hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(req.body.password, salt);

    // Create email token
    const emailToken = randomstring.generate(10);

    // Create customer model and save
    customer = new Customer({name, email, role, password, emailToken});
    // await customer.save();

    // Send email verification to customer
    const verifyURL = `http://localhost:3000/api/customer/verify/${emailToken}`;
    const subject = 'XYZ Solutions Email Verification';
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server error" });
  }
});

module.exports = router;
