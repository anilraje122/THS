// Imports
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');
const util = require('util');
const { parseJsonToObject } = require('./helpers');

// Create export object
const lib = {};
lib.baseDir = path.join(__dirname, '/../.data/');

// Promisify read, write and delete
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);

// Create new file and insert data
lib.create = async (dir, file, data, callback) => {
    try {
        writeFile(lib.baseDir + dir + '/' + file + '.json', stringData);
        callback(false);
    } catch (err) {
        callback('Error in Writing to new file!');
        console.log(err);
    }
}

// Read an existing file
lib.read = async (dir, file, callback) => {
    try {
        const data = await readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8');
        const parsedData = parseJsonToObject(data);
        callback(false, parsedData);
    } catch (err) {
        callback(err, null);
    }
}

// Function to update (replace) the file content
lib.update = async (dir, file, data, callback) => {
    try {
        writeFile(lib.baseDir + dir + '/' + file + '.json', stringData);
        callback(false);
    } catch (err) {
        callback('Error in Writing to new file!');
        console.log(err);
    }
}

// Delete file
lib.delete = async (dir, file, callback) => {
    try {
        await unlink(lib.baseDir + dir + '/' + file + '.json');
    } catch (err) {
        callback("Error in Deleting File");
    }
}

// Export lib object
module.exports = lib;
