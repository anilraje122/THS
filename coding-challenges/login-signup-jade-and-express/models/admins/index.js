const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Define admin schema */
const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  accessToken: {
    type: String
  },
  role: {
    type: String,
    required: true
  }
});

/* Export admin model */
module.exports = mongoose.model('Admins', adminSchema, 'admins');
