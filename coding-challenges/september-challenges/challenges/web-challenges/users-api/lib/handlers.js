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
// Optional fields : None
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

// GET method for /users
// Required fileds : phone(unique)
// Optional fields : Rest of the fields 
handlers._users.get = (data, callback) => {
    // Get required field from query params
    const phone = typeof (data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length === 10 ? data.queryStringObject.phone : false;
    if(phone) {
        _data.read('users', phone, (err, data) => {
            if(!err && data) {
                delete data.hashedPassword;
                callback(200, data);
            } else {
                callback(400, {"Error": "There is no user available with this phone number"})
            }
        });
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"})
    }
}

// PUT method for /users
// Required fileds : phone(unique)
// Optional fields : Rest of the fields 
handlers._users.put = (data, callback) => {
    // Get required field from request body
    const phone = typeof (data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    // Optional field validation
    const firstName = typeof (data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof (data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const password = typeof (data.payload.password) === 'string' && data.payload.password.length >= 6 ? data.payload.password : false;
    if(phone) {
        if(firstName || lastName || password) {
            // Check if the user file exist
            _data.read('users', phone, (err, userData) => {
                if(!err && userData) {  
                    if(firstName) { userData.firstName = firstName } 
                    if(lastName) { userData.lastName = lastName } 
                    if(password) { userData.hashedPassword = helpers.hash(password) }
                    // Store new data to exisiting user file
                    _data.update('users', phone, userData, (err) => {
                        if(!err) {
                            callback(200, {"Success": "User details updated"});
                        } else {
                            console.log(err);
                            callback(500, {"Error": "Server error, Unable to update the details"});
                        }
                    });
                } else {
                    callback(400, {"Error": "Specified user does not exist"});
                }
            });
        } else {    
            callback(400, {"Error": "Missing fields to update"});
        }
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"});
    }
}


// Delete method for /users
// Required fileds : phone(unique)
// Optional fields : Rest of the fields
handlers._users.delete = (data, callback) => {
    // Get required field from query params
    const phone = typeof (data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length === 10 ? data.queryStringObject.phone : false;
    // Check if user exist
    if(phone) {
        _data.read('users', phone, (err, data) => {
            if(!err && data) {
                _data.delete('users', phone, (err) => {
                    if(!err) {
                        callback(200, {"Success": "User deleted successfully"});
                    } else {
                        callback(500, {"Error": "Server error, Could not delete user"});
                    }
                });
            } else {
                callback(400, {"Error": "Specified user does not exist"});
            }
        });
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"});
    }
}







// Response for NOT FOUND route
handlers.notFound = (data, callback) => {
    callback(404, { "Status": "Not Found" });
}

module.exports = handlers;
