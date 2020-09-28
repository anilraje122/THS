// Imports
const crypto = require('crypto');
const config = require('../config');

// Global vars
const helpers = {};

// Hash password for new user
helpers.hash = (str) => {
    if (typeof (str) === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
}

// Parse buffer to object
helpers.parseJsonToObject = (str) => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch(err) {
        return {};
    }
}

// Export module object
module.exports = helpers;