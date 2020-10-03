// Implementing routing handlers
const _data = require('./data');
const helpers = require('./helpers');

const handlers = {}; 

// Router handlers for users
handlers.users = (data, callback) => {
    // This block will run When /users is accessed
    // data contains req method, payload and headers
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) !== -1) {
       handlers._users[data.method](data, callback);
    } else {
        callback(405, {"Error": "Inavlid HTTPMethod. Request Failed"});
    }
}

/* 
POST method for /users
Required user data (From request body) : firstname, lastname, phone (unique), password, tosAgreement
Optional user data : none 
*/
handlers._users = {};
handlers._users.post = (data, callback) => {
    // Implement validation, check all required user data fields
    const firstName = typeof(data.payload.firstName) === 'string' && (data.payload.firstName).trim().length > 0 ? (data.payload.firstName).trim() : false;
    const lastName = typeof(data.payload.lastName) === 'string' && (data.payload.lastName).trim().length > 0 ? (data.payload.lastName).trim() : false;
    const phone = typeof(data.payload.phone) === 'string' && (data.payload.phone).trim().length > 0 ? (data.payload.phone).trim() : false;
    const password = typeof(data.payload.password) === 'string' && (data.payload.password).length >= 6 ? data.payload.password : false;
    const tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false;
    if(firstName && lastName && phone && password && tosAgreement) {
        // Make sure User does not exist
        _data.read('users', phone, (err, data) => {
            if(err) { // if error is true, file does not exist => create new user file
                // Hash the password
                const hashPassword = helpers.hash(password);                
                if(hashPassword){
                    // Create user Object to store in the disk
                    const userObject = {
                        'firstName': firstName,
                        'lastName': lastName,
                        'phone': phone,
                        'hashedPassword': hashPassword,
                        'tosAgreement': tosAgreement
                    }
                    // Save the User Object to disk
                    _data.create('users', phone, userObject, (err) => {
                        if(!err) {
                            callback(200, {"Success": "User Registerd Successfully!"});
                        } else {
                            console.log(err);
                            callback(500, {"Error": "Could not create the User!"});
                        }
                    });
                } else {
                    callback(500, {"Error": "Could not hash the password!"});
                }
            } else {
                callback(400, {"Error": "User already exist with same Phone number!"});
            }
        });
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"});
    }  
}

/* 
GET method for /users
Required Data : (From Query Params) Phone Number
Optional Data : None
It is a public route now
Feature to be added in future : It is a private route, only logged in users can query user data!
*/
handlers._users.get = (data, callback) => {
    // Check if Phone number is valid
    const phone = typeof (data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length === 10 ? data.queryStringObject.phone.trim() : false;
    if(phone) {
        // Lookup for a user file with the same phone number
        _data.read('users', phone, (err, data) => {
            if(!err && data) {
                // Remove password from the data
                delete data.hashedPassword;
                callback(200, data);
            } else {
                console.log(err);
                callback(400, {"Error": "There is no user available with this phone number!"});
            }
        })
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"});
    }
}

/* 
PUT method for /users
Required Data : (From body) Phone Number
Optional Data : Rest of the fields
It is a public route now
Feature to be added in future : It is a private route, only logged in users can query user data!
*/
handlers._users.put = (data, callback) => {
     // Check if Phone number is valid
     const phone = typeof (data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    //  Check optional fields
    const firstName = typeof(data.payload.firstName) === 'string' && (data.payload.firstName).trim().length > 0 ? (data.payload.firstName).trim() : false;
    const lastName = typeof(data.payload.lastName) === 'string' && (data.payload.lastName).trim().length > 0 ? (data.payload.lastName).trim() : false;
    const password = typeof(data.payload.password) === 'string' && (data.payload.password).length >= 6 ? data.payload.password : false;

    if(phone) {
        if(firstName || lastName || password) {
            _data.read('users', phone, (err, userData) => {
                if(!err && userData) {
                    // Update the fields
                    if(firstName) { userData.firstName = firstName };
                    if(lastName) { userData.lastName = lastName };
                    if(password) { userData.hashedPassword = helpers.hash(password) };
                    // Store new data to the same user file
                    _data.update('users', phone, userData, (err) => {
                        if(!err) {
                            callback(200, {"Success": "User Data Updated"});
                        } else {
                            console.log(err);
                            callback(500, {"Error": "Could not update user data!"});
                        }
                    })
                } else {
                    callback(400, {"Error": "There is no user available with this phone number!"})
                }
            })
        } else {
            callback(400, {"Error": "Missing fields to update"});
        }
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"});
    }
}

/* 
DELETE method for /users
Required Data : (From Query Params) Phone Number
Optional Data : Rest of the fields
It is a public route now
Feature to be added in future : It is a private route, only logged in users can query user data!
*/

handlers._users.delete = (data, callback) => {
    // Check if Phone number is valid
    const phone = typeof (data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length === 10 ? data.queryStringObject.phone.trim() : false;
    if(phone) {
        _data.read('users', phone, (err) => {
            if(!err) {
                _data.delete('users', phone, (err) => {
                    if(!err) {
                        callback(200, {"Success": "User Data Deleted"});
                    } else {
                        console.log(err);
                        callback(500, {"Error": "Could not delete user data!"});
                    }
                });
            } else {
                callback(400, {"Error": "There is no user available with this phone number!"});
            }
        })
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"});
    }
}

// Router handler for other paths
handlers.ping = (data, callback) => {
    // callback returns a http status code and a payload object
    callback(200, {'status': 'You just accessed /ping'});
}
handlers.notFound = (data, callback) => {
    callback(404, {'status': 'Page Not Found'});
}

// Export handler modul
module.exports = handlers;