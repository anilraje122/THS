const { Router } = require("express");
const authMiddleware = require("../../controller/authMiddleware");
const { body, validationResult } = require("express-validator");

const router = Router();
const CustomerProfile = require("../../models/customerProfile");
const Customer = require("../../models/customer");

/* 
Route : /api/customer/profile
Description : Create customer profile
Private Route
*/
router.post("/", authMiddleware, async (req, res) => {
  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Get all inputs
    let {
      address,
      website,
      location,
      phone,
      skills,
      bio,
      youtube,
      instagram,
      linkedin,
      twitter,
      facebook,
    } = req.body;

    // Check if the customer is active or not
    const customer = await Customer.findById(req.customer.customer);
    if (!customer.active) {
      return res.status(400).json({ Error: "Email is not verified" });
    }

    //  Check if a profile already exist for the customer
    const existingCustomerProfile = await CustomerProfile.findOne({
      customer: customer._id,
    });
    if (existingCustomerProfile) {
      return res
        .status(400)
        .json({ Error: "A profile already exist for this customer" });
    }

    // Build customer profile object
    let customerProfileObject = {};
    customerProfileObject.customer = customer._id;
    if (address) customerProfileObject.address = address;
    if (website) customerProfileObject.website = website;
    if (location) customerProfileObject.location = location;
    if (phone) customerProfileObject.phone = phone;
    let skillArray = skills.split(",").map((skill) => skill.trim());
    if (skillArray.length > 0) customerProfileObject.skills = skillArray;
    if (bio) customerProfileObject.bio = bio;
    customerProfileObject.social = {};
    if (youtube) customerProfileObject.social.youtube = youtube;
    if (instagram) customerProfileObject.social.instagram = instagram;
    if (linkedin) customerProfileObject.social.linkedin = linkedin;
    if (twitter) customerProfileObject.social.twitter = twitter;
    if (facebook) customerProfileObject.social.facebook = facebook;

    // Create new customer profile model and save to database
    const newCustomerProfile = new CustomerProfile(customerProfileObject);
    await newCustomerProfile.save();
    res.status(200).json({ newCustomerProfile });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server Error" });
  }
});

/* 
Route : /api/customer/profile
Description : Get customer profile
Private Route
*/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const customerProfile = await CustomerProfile.findOne({
      customer: req.customer.customer,
    }).populate("customer", "name email -_id");
    res.status(200).json({ customerProfile });
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

/* 
Route : /api/customer/profile/all
Description : Get all customer profiles
Public Route
*/
router.get("/all", async (req, res) => {
  try {
    const customerProfiles = await CustomerProfile.find({}).populate(
      "customer",
      "-password -_id"
    );
    res.status(200).json({ customerProfiles });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server Error" });
  }
});

/* 
Route : /api/customer/profile/experience
Description : Add experience to customer profile
Private Route
*/
router.put("/experience", authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Get all inputs
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    // check if customer profile exist
    const existingCustomerProfile = await CustomerProfile.findOne({
      customer: req.customer.customer,
    });
    if (!existingCustomerProfile) {
      return res
        .status(400)
        .json({ Errors: "Customer profile does not exist" });
    }

    // Build experience object
    let expObject = {};
    if (title) expObject.title = title;
    if (company) expObject.company = company;
    if (location) expObject.location = location;
    if (from) expObject.from = from;
    if (to) expObject.to = to;
    if (current) expObject.current = current;
    if (description) expObject.description = description;

    // push experience to the customer profile model and save to database
    existingCustomerProfile.experience.unshift(expObject);
    await existingCustomerProfile.save();

    res.status(200).json({ Success: "Experience added successfully" });
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

module.exports = router;
