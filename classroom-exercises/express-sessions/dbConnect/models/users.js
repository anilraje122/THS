/* Imports */
const mongoose = require('mongoose');

// MVC = Models + Views + Controllers
// Data fields : firstname, lastname, email (unique), password

const Schema = mongoose.Schema;

/* Create db schema */
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


/* Export model from db schema*/
// params : model name, schema name, colection (db) name
module.exports = mongoose.model("Users", userSchema);

