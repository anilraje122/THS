const { Router } = require("express");
const authMiddleware = require("../../controllers/authMiddleware");
const { body, validationResult } = require("express-validator");
const CustomerProfile = require("../../models/CustomerProfile");
const Customer = require("../../models/Customer");
const { findOneAndUpdate } = require("../../models/CustomerProfile");

const router = Router();

/* 
Route: /api/customer/profile
Description: add customer profile info
Private Route
*/
router.post(
  "/",
  [
    authMiddleware,
    [
      body("address", "Invalid address").isString(),
      body("website", "Invalid website").isString(),
      body("location", "Invalid location").isString(),
      body("phone", "Invalid phone number").isString(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const customerData = await Customer.findById(req.customer.customer);
      if (!customerData.active) {
        return res.status(200).json({ Message: "Email is not verified!" });
      }
      const {
        address,
        website,
        location,
        phone,
        isOpen,
        skills,
        bio,
        youtube,
        linkedin,
        facebook,
        twitter,
        instagram,
      } = req.body;
      // Build a profile object
      const profileFields = {};
      profileFields.customer = req.customer.customer;
      if (address) profileFields.address = address;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (phone) profileFields.phone = phone;
      if (isOpen) profileFields.isOpen = isOpen;
      if (skills) {
        profileFields.skills = skills.split(",").map((skill) => skill.trim());
      }
      if (bio) profileFields.bio = bio;
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (facebook) profileFields.social.facebook = facebook;
      if (twitter) profileFields.social.twitter = twitter;
      if (instagram) profileFields.social.instagram = instagram;

      let customerProfile = await CustomerProfile.findOne({
        customer: req.customer.customer,
      });
      if (customerProfile) {
        // Update existing profile
        customerProfile = await CustomerProfile.findOneAndUpdate(
          {
            customer: req.customer.customer,
          },
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).json({ customerProfile });
      }
      // Create new profile
      customerProfile = new CustomerProfile(profileFields);
      await customerProfile.save();
      res.status(200).json({ Success: "New Profile Created" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ customerProfile });
    }
  }
);

/* 
Route: /api/customer/profile
Description: Get customer profile info
Private Route
*/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const customerProfile = await CustomerProfile.findOne({
      customer: req.customer.customer,
    }).populate("customer", "name email");
    // if (!customerProfile) {
    //   return res
    //     .status(400)
    //     .json({ Error: "Customer profile does not exist!" });
    // }
    res.status(200).json({ customerProfile });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server" });
  }
});

/* 
Route: /api/customer/profile/all
Description: Get all customer profiles
Public Route
*/
router.get("/all", async (req, res) => {
  try {
    const customerProfiles = await CustomerProfile.find({}).populate(
      "customer",
      "name email -_id"
    );
    res.status(200).json({ customerProfiles });
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

/* 
Route: /api/customer/profile/experience
Description: Add experience to existing customer profile
Private Route
*/
router.put(
  "/experience",
  [
    body("title", "Invalid title").notEmpty(),
    body("company", "Invalid company").notEmpty(),
    body("from", "Invalid from").notEmpty(),
  ],
  authMiddleware,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        title,
        company,
        from,
        location,
        to,
        current,
        description,
      } = req.body;
      // Build experience object
      const newExp = {
        title,
        company,
        from,
        location,
        to,
        current,
        description,
      };
      const customerProfile = await CustomerProfile.findOne({
        customer: req.customer.customer,
      });
      console.log(newExp);
      console.log(customerProfile);
      customerProfile.experience.unshift(newExp);
      await customerProfile.save();
      res.status(200).json({ customerProfile });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Server Error" });
    }
  }
);
module.exports = router;
