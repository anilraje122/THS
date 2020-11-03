const { Router } = require("express");
const authMiddleware = require("../../controllers/authMiddleware");
const { body, validationResult } = require("express-validator");
const CustomerProfile = require("../../models/CustomerProfile");

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
      const { address, website, location, phone } = req.body;
      const newCustomer = new CustomerProfile({
        customer: req.customer.customer,
        address,
        website,
        location,
        phone,
      });
      await newCustomer.save();
      res.status(200).json({ newCustomer });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Server" });
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

module.exports = router;
