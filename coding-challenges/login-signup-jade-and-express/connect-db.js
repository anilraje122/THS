const config = require('./config/default.json');
const mongoose = require('mongoose');

/* Connect to DB */
connectDB = async () => {
  try {
    await mongoose.connect(config.DB.LOCAL.URI, {});
    console.log('Successfully connected to database');
  } catch (err) {
    console.log(err);
    console.log('Unable to connect to database');
  }
}

/* Export connect db function */
module.exports = connectDB;