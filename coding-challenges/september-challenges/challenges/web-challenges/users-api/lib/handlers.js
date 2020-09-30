// Imports
const _data = require('./data');
const helpers = require('./helpers');

// Global vars
const handlers = {};

// Router handler for /age
handlers.age = (data, callback) => {
    const acceptableMethods = ['get'];
    if(acceptableMethods.indexOf(data.method) !== -1) {
        handlers._age[data.method](data, callback);
    } else {
        callback(405, {'Error': 'Invalid HTTP method! Request Failed.'})
    }
}

handlers._age = {}
// GET method for /age
// GET /age?phone=xxxxxxxx
// Required fileds : phone(unique)
// Optional fields : None
handlers._age.get = (data, callback) => {
    // Get required field from query params
    let {phone} = data.queryStringObject;
    phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone : false;
    if(phone) {
        _data.read('users', phone, (err, userData) => {
            if(!err && userData) {
                console.log(userData);
                console.log(typeof userData);
                const age = helpers.getTimDiff(userData._id, Date.now());                
                if(age) {
                    callback(200, age);
                } else {
                    console.log(err);
                    callback(500, {"Error": "Server error, Unable to retrieve age"})
                }
            } else {
                callback(400, {"Error": "There is no user available with this phone number"});
            }
        });
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"});
    }
}

// Router handler for /hobby
handlers.hobby = (data, callback) => {
    const acceptableMethods = ['put', 'delete'];
    if(acceptableMethods.indexOf(data.method) !== -1) {
        handlers._hobby[data.method](data, callback);
    } else {
        callback(405, {'Error': 'Invalid HTTP method! Request Failed.'});
    }
}

handlers._hobby = {};
// PUT method for /hobby
// PUT /hobby?phone=983857894	
// Required fileds : phone(unique) from query params and hobbies from payload(request body)
// Optional fields : Rest of the fields 
handlers._hobby.put = (data, callback) => {
    // Get phone number from query params
    let {phone} = data.queryStringObject;
    // Get hobbies from payload/request body
    let {hobbies} = data.payload;
    phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone : false;
    hobbies = typeof (hobbies) === 'object' && hobbies.length > 0 ? hobbies : false;    
    // Add multiple hobbies to the User (Array of strings) : PUT /hobby?phone=983857894
    if(phone) {
        if(hobbies) {
            // Check if the user file exist
            _data.read('users', phone, (err, userData) => {
                console.log(err);
                if(!err && userData) {  
                    if(hobbies) { userData.hobbies = hobbies };
                    _data.update('users', phone, userData, (err) => {
                        if(!err) {
                            callback(200, {"Success": "Hobby list updated"});
                        } else {
                            console.log(err);
                            callback(500, {"Error": "Server error, Unable to update hobby list"});
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

// DELETE method for /hobby
// DELETE /hobby/delete?phone=7899179779&hobby=<hobby name>
// Required fileds : phone(unique) and hobby from query params
// Optional fields : Rest of the fields 
handlers._hobby.delete = (data, callback) => {
    // Get required field from query params
    let {phone, hobby} = data.queryStringObject;
    phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone : false;
    hobby = typeof (hobby) == 'string' && hobby.trim().length > 0 ? hobby : false;
    // Check if user exist
    if(phone && hobby) {
        _data.read('users', phone, (err, userData) => {
            if(!err && userData) {
                // Check if hobby exist
                if('hobbies' in userData && userData.hobbies.indexOf(hobby) !== -1) {
                    // Remove hobby from hobbies object
                    let updatedHobbies = helpers.removeItemArr(hobby, userData.hobbies);
                    userData.hobbies = updatedHobbies;
                    _data.update('users', phone, userData, (err) => {
                        if(!err) {
                            callback(200, {"Success": "Hobby removed"});
                        } else {
                            console.log(err);
                            callback(500, {"Error": "Server error, Unable to remove Hobby"});
                        }
                    });
                } else {
                    callback(400, {"Error": "Given Hobby does not exist for the User specified"});
                }
            } else {
                callback(400, {"Error": "Specified user does not exist"});
            }
        });
    } else {
        callback(400, {"Error": "Validation failed/Missing fields"});
    }
}

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
// POST /users
// Required fileds : firstName, lastName, phone(unique), password, tosAgreement
// Optional fields : None
handlers._users.post = (data, callback) => {    
    // Get all fields from request body/payload
    let {firstName, lastName, phone, email, password, tosAgreement} = data.payload;
    
    firstName = typeof (firstName) === 'string' && firstName.trim().length > 0 ? firstName.trim() : false;
    lastName = typeof (lastName) === 'string' && lastName.trim().length > 0 ? lastName.trim() : false;
    phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone.trim() : false;    
    email = typeof (email) === 'string' && email.trim().length > 0 ? email.trim() : false;
    password = typeof (password) === 'string' && password.length >= 6 ? password : false;
    tosAgreement = typeof (tosAgreement) === 'boolean' && tosAgreement === true ? true : false;

    if(firstName && lastName && phone && email && password && tosAgreement) {
        // Check if user already exist
        _data.read('users', phone, (err, data) => {
            if(err) {
                const hashedPassword = helpers.hash(password);
                const _id = Date.now(); // get current timestamp
                if(hashedPassword) {
                    // Create final user object
                    const userObject = {
                        _id,
                        firstName,
                        lastName,
                        phone,
                        email,
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
    // Get all user's data in one response: GET /users
    if(data.trimmedPath === 'users' && Object.keys(data.queryStringObject).length === 0) {
        _data.readAllFiles('users', (err, data) => {
            if(!err && data) {
                callback(200, data);
            } else {
                callback(500, {"Error": "Server error, Unable to read all files"});
            }        
        });
    } else {
        // Get individual user Data : GET /users?=phone=xxxxxxxx
        // Get required field from query params
        let {phone} = data.queryStringObject;
        phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone : false;

        if(phone) {
            _data.read('users', phone, (err, data) => {
                if(!err && data) {
                    delete data.hashedPassword;
                    callback(200, data);
                } else {
                    callback(400, {"Error": "There is no user available with this phone number"});
                }
            });
        } else {
            callback(400, {"Error": "Validation failed/Missing fields"});
        }
    }   
}

// PUT method for /users
// Required fileds : phone(unique)
// Optional fields : Rest of the fields 
handlers._users.put = (data, callback) => {
    // Get required field from request body
    let {phone} = data.payload;
    phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone.trim() : false;

    // Optional field validation
    let {firstName, lastName, email, password} = data.payload;
    firstName = typeof (firstName) === 'string' && firstName.trim().length > 0 ? firstName.trim() : false;
    lastName = typeof (lastName) === 'string' && lastName.trim().length > 0 ? lastName.trim() : false;
    email = typeof (email) === 'string' && email.trim().length > 0 ? email.trim() : false;
    password = typeof (password) === 'string' && password.length >= 6 ? password : false;
    if(phone) {
        if(firstName || lastName || email || password) {
            // Check if the user file exist
            _data.read('users', phone, (err, userData) => {
                if(!err && userData) {  
                    if(firstName) { userData.firstName = firstName }; 
                    if(lastName) { userData.lastName = lastName }; 
                    if(email) { userData.email = email };
                    if(password) { userData.hashedPassword = helpers.hash(password) };
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
    let {phone} = data.queryStringObject;
    phone = typeof (phone) === 'string' && phone.trim().length === 10 ? phone : false;
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
    callback(404, {"Error": "HTTP ERROR 404: Page Not Found"});
}

// Export handlers object
module.exports = handlers;