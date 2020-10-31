const mongoose = require('mongoose');
const config = require('./config/default.json');

connectDB = async () => {
  try {
    await mongoose.connect(config.DB.LOCAL.URI + '/' + config.DB.LOCAL.DB_NAME, {useUnifiedTopology: true, });
    console.log('Successfully connected to database');
  } catch (err) {
    console.log('Could not connect to database');
    console.log(err);
  }
}

module.exports = connectDB;