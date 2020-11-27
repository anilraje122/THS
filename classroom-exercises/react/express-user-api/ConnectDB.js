const mongoose = require("mongoose");
const { DB } = require("./Config/default.json");

// Connect to database
connectDB = async () => {
  try {
    await mongoose.connect(DB.URI, { UnifiedTopology: true });
    console.log("Success: Connected to database");
  } catch (err) {
    console.log("Error: Could not connect to database!");
  }
};

module.exports = connectDB;
