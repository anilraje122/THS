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

// Find difference between two time stamps
helpers.getTimDiff = (oldTs, newTs) => {
    // const newTs = Date.now();
    let diff = {};
    if(oldTs && newTs) {
        diff.seconds = Math.floor((new Date(newTs) - new Date(oldTs))/1000);
        diff.mins = Math.floor(diff.seconds/60);
        diff.hours = Math.floor(diff.mins/60);
        diff.days = Math.floor(diff.hours/24);
        return diff;
    } else {
        return false;
    }
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