const mongoose = require("mongoose");
const { DB } = require("./Config/default.json");

connectDB = async () => {
  try {
    await mongoose.connect(DB.URI, {});
    console.log("Success: Connected to database");
  } catch (err) {
    console.log("Error: Could not connect to database!");
  }
};

module.exports = connectDB;
