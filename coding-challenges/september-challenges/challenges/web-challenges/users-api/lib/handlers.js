// Imports
const _data = require('./data');
const helpers = require('./helpers');

// Global vars
const handlers = {};

// Router handler for /users
handlers.users = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) !== -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405, {'Error':'Invalid HTTP method! Request Failed.'});
    }
}

handlers._users = {};
// POST method for /users
// Required fileds : firstName, lastName, phone(unique), password, tosAgreement
// Option field : None
handlers._users.post = (data, callback) => {
    // Get all fields from request body/payload
    const firstName = typeof (data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof (data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phone = typeof (data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    const password = typeof (data.payload.password) === 'string' && data.payload.password.length >= 6 ? data.payload.password : false;
    const tosAgreement = typeof (data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false;

    if(firstName && lastName && phone && password && tosAgreement) {
        // Check if user already exist
        _data.read('users', phone, (err, data) => {
            if(err) {
                const hashedPassword = helpers.hash(password);
                if(hashedPassword) {
                    // Create final user object
                    const userObject = {
                        firstName,
                        lastName,
                        phone,
                        hashedPassword,
                        tosAgreement : true
                    }
                    // Save user info to disk
                    _data.create('users', phone, userObject, (err) => {
                        if(!err) {  
                            callback(200, {"Success": "User registered successfully"});
                        } else {    
                            callback(500, {"Error" : "Could not create a new user!"});
                        }
                    });
                } else {
                    callback(500, {"Error": "Could not hash the Password"});
                }
            } else {
                callback(400, {"Error": "A user with same phone number already exist!"});
            }
        });
    } else {
        callback(400, {"Error" : "Validation failed/Missing fields"});
    }
}

handlers.notFound = (data, callback) => {
    callback(404, { "Status": "Not Found" });
}

module.exports = handlers;
