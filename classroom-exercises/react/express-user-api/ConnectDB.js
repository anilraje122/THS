const mongoose = require("mongoose");
const { DB } = require("./Config/default.json");

// Connect to database
connectDB = async () => {
  try {
    await mongoose.connect(DB.URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Success: Connected to database");
  } catch (err) {
    console.log("Error: Could not connect to database!");
    console.log(err);
  }
};

module.exports = connectDB;
