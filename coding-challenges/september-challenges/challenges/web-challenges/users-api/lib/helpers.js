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
    } 
    return false;
}

// Parse buffer to object
helpers.parseJsonToObject = (str) => {
    try {
        return JSON.parse(str);
    } catch(err) {
        return {};
    }
}

// Get current time stamp
helpers.getCurTimeStamp = () => {
    const d = new Date();
    const date = d.toLocaleDateString().split('/').join('-');
    const time = d.getTime();
    return `${date}-${time}`
}

// Find difference between two time stamps
helpers.getTimDiff = (oldTs, newTs) => {
    
}

// Remove an item from an array
helpers.removeItemArr = (item, arr) => {
    let newArr = [];
    for(let i=0; i<arr.length; i++) {
        if(arr[i] !== item) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// Export helpers object
module.exports = helpers;