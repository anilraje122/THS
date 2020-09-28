// Imports
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

// Create export object
const lib = {};
lib.baseDir = path.join(__dirname, '/../.data/');

// Create new file and insert data
lib.create = (dir, file, data, callback) => {
    console.log(dir, file, data);
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if(!err) {
                    fs.close(fileDescriptor, (err) => {
                        if(!err) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error in writing to new file');
                }
            });
        } else {
            callback('Could not create New File, or It may be there already!');
        }
    });
}

// Read an existing file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', (err, data) => {
        if(!err && data) {
            const prasedData = helpers.parseJsonToObject(data);
            callback(false, prasedData);
        } else {
            callback(err, data);
        }
    }); 
}

// Function to update (replace) the file content
lib.update = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.truncate(fileDescriptor, (err) => {
                if(!err) {
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err) {
                            fs.close(fileDescriptor, (err) => {
                                if(!err) {  
                                    callback(false);
                                } else {
                                    callback('Error in closing file');
                                }
                            });
                        } else {
                            callback('Error in writing file')
                        }
                    });
                } else {
                    callback('Error in truncating file')
                }
            });
        } else {
            callback('Could not open the file for update');
        }
    });
}

// Delete file
lib.delete = (dir, file, callback) => {
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
        if(!err) {
            callback(false);
        } else {
            callback('Error in deleting file');
        }
    });
}

// Export module object
module.exports = lib;
