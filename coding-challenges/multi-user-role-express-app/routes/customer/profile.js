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
router.post(
  "/",
  authMiddleware,
  [
    body("address", "Invalid address").isString(),
    body("website", "Invalid website").isString(),
    body("location", "Invalid location").isString(),
    body("phone", "Invalid phone").isString(),
    body("company", "Invalid company").isString(),
    body("skills", "Invalid skills").isArray(),
    body("bio", "Invalid bio").isString(),
  ],
  async (req, res) => {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get all inputs
      const {
        address,
        website,
        location,
        phone,
        company,
        skills,
        bio,
      } = req.body;
      // Check if the customer is active or not
      const customer = await Customer.findById(req.customer.customer);
      if (!customer.active) {
        return res.status(400).json({ Error: "Email is not verified" });
      }
      // Create new customer profile model and save to database
      const customerProfile = new CustomerProfile({
        customer: req.customer.customer,
        address,
        website,
        location,
        phone,
        company,
        skills,
        bio,
      });
      await customerProfile.save();
      res.status(200).json({ customerProfile });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Server Error" });
    }
  }
);

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
      "name email -_id"
    );
    res.status(200).json({ customerProfiles });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server Error" });
  }
});

module.exports = router;
