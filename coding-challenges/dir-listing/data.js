/* Imports */
const fs = require('fs');
const util = require('util');

/* Global vars */
const data = {};

/* Promise conversion */
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

/* Data methods */

// Read directory and return file/dir names
data.readDirectory = async (dir) => {
    try {
        const dirItems = await readdir(dir);
        return dirItems;
    } catch(err) {
        console.log(err);
    }
}

// Get information about the file/dir
data.readStat = async (dir) => {
    try {
        const status = await stat(dir);
        return status;
    } catch(err) {
        console.log(err);
    }
}




/* Exports */
module.exports = data;

