var express = require('express');
var router = express.Router();

/* Imports */
const Seller = require('../models/seller');
const Car = require('../models/car');
const { find } = require('../models/seller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Create seller profile */
router.post('/seller',  async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.send('Seller profile created successfully')
  } catch (err) {
    res.send(err);
  }
});

/* Get all seller profiles */
router.get('/seller', async (req, res) => {
  try { 
    const sellerData = await Seller.find({});
    res.json({sellerData});
  } catch (err) {
    res.send(err);
  }
});

/* Create car profile */
router.post('/car/:sellerId', async (req, res) => {
  try {
    const sid = req.params.sellerId;
    const car = new Car(req.body);
    const seller = await Seller.findById(sid);
    // update car with seller details
    car.seller = seller;
    await car.save();
    seller.cars.push(car);
    await seller.save();
    res.send('Car profile created successfully');
  } catch (err) {
    res.send(err);
  }
});

/* Get all car profiles */
router.get('/car', async (req, res) => {
  try { 
    const carData = await Car.find({});
    res.json({carData});
  } catch (err) {
    res.send(err);
  }
});

/* Get a particular seller profiles */
router.get('/seller/:sid', async (req, res) => {
  try {
    const sid = req.params.sid; 
    const sellerData = await Seller.findById(sid).populate('cars','model year -_id');
    res.json({sellerData});
  } catch (err) {
    res.send(err);
  }
});

/* Get a particular car profiles */
router.get('/car/:cid', async (req, res) => {
  try {
    const cid = req.params.cid; 
    const carData = await Car.findById(cid).populate('seller','name email -_id');
    res.json({carData});
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
