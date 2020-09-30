// Imports
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');
const util = require('util');

// Create export object
const lib = {};
lib.baseDir = path.join(__dirname, '/../.data/');

// Promisify read, write and delete
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);

// Create new file and insert data
lib.create = async (dir, file, data, callback) => {
    const stringData = JSON.stringify(data);
    try {
        writeFile(lib.baseDir + dir + '/' + file + '.json', stringData);
        callback(false);
    } catch (err) {
        callback('Error in Writing to new file!');
        console.log(err);
    }
}

// Read existing file
lib.read = async (dir, file, callback) => {
    try {
        const data = await readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8');
        const parsedData = helpers.parseJsonToObject(data);
        callback(false, parsedData);
    } catch (err) {
        callback(err, null);
    }
}

// Update (replace) file content
lib.update = async (dir, file, data, callback) => {
    const stringData = JSON.stringify(data);
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
        callback(false);
    } catch (err) {
        callback("Error in Deleting File");
    }
}

// Read all files in a directory
lib.readAllFiles = async (dir, callback) => {
    let userData = [];
    try {
        const files = await readdir(lib.baseDir + dir);
        for(let i=0; i<files.length; i++) {
            const data = await readFile(lib.baseDir + dir + '/' + files[i], 'utf-8');
            const parsedData = helpers.parseJsonToObject(data);
            userData.push(parsedData);
        }
        callback(false, userData);
    } catch (err) {
        console.log(err);
        callback("Unable to read all files from users directory");
    }
}

// Export lib object
module.exports = lib;
