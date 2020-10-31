const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  emailToken: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Customer', adminSchema, 'customers')