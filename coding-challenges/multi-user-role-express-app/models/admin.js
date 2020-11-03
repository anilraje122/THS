const { Schema, model } = require("mongoose");

const adminSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  emailToken: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Admin", adminSchema, "admins");
