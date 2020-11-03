const mongoose = require('mongoose');
const {DB} = require('./config/default.json');

connectDB = async () => {
  try {
    await mongoose.connect(DB.URI, {});
    console.log('Successfully connected to database');
  } catch (err) {
    console.log('Error: Could not connect to database');
  }
}

module.exports = connectDB;