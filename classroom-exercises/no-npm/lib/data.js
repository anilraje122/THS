// Imports
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

// Global vars
const lib = {};

// Set base dir for local data store
lib.baseDir = path.join(__dirname, '/../.data/');

// Create new file and insert data
lib.create = (dir, file, data, callback) => {
    let fullFileName = lib.baseDir+dir+'/'+file+'.json';
    // Open new file
    fs.open(fullFileName, 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            console.log(`${file} is created and Opened successfully!`);
            const stringData = JSON.stringify(data);
            // Write data to file
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if(!err) {
                    fs.close(fileDescriptor, (err) => {
                        if(!err) {
                            console.log(`Data is added successfully!`);
                            callback(false);
                        } else {
                            console.log('Error: Could not close the file!');
                        }
                    });
                } else {
                    callback("Error: Could not write to new file!\n");
                }
            });
        } else {
            callback('Error: Could not create a new file!\n'+ err);
        }
    });
}

// Read a file and return the content
lib.read = (dir, file, callback) => {
    let fullFileName = lib.baseDir+dir+'/'+file+'.json';
    fs.readFile(fullFileName, 'utf-8', (err, data) => {
        if(!err && data) {
            const parsedData = helpers.parseJsonToObject(data);
            callback(false, parsedData);
        } else {
            callback(err, data);
        }
    })
}

// Update existing file with new content (Replace the content)
lib.update = (dir, file, data, callback) => {
    let fullFileName = lib.baseDir+dir+'/'+file+'.json';
    // Open new file
    fs.open(fullFileName, 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            console.log(`${file} is opened successfully!`);
            const stringData = JSON.stringify(data);
            // Truncate the file/Resize the file
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err) {
                    // Write new content to the file
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err) {
                            // Close the file
                            fs.close(fileDescriptor, (err) => {
                                if(!err) {
                                    callback(false);
                                } else {
                                    callback('Error: Could not not close the file!\n'+ err);
                                }
                            })
                        } else {
                            callback('Error: Could not write new content!\n'+ err);
                        }
                    })
                } else {
                    callback('Error: Could not truncate the file!\n'+ err);
                }
            })
        } else {
            callback('Error: Could not open file for update!\n'+ err);
        }
    });
}

// Delete file
lib.delete = (dir, file, callback) => {
    let fullFileName = lib.baseDir+dir+'/'+file+'.json';
    fs.unlink(fullFileName, (err, data) => {
        if(!err) {
            console.log('File is deleted successfully!');
            callback(false);
        } else {
            callback('Error: Could not delete the file!\n'+ err);
        }
    })
}


// Exports
module.exports = lib;