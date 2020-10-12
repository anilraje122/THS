// Imports
const fs = require('fs');
const path = require('path');

// Global vars
const lib = {};

// Define attribute
lib.basedir = path.join(__dirname, '/../');

// Define methods

// Create new file and add content 
lib.create = (dir, file, data, callback) => {
    fs.open(`${lib.basedir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            callback(false, 'Info: File opened successfully');
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if(!err) {
                    callback(false, 'Info: Data saved to file');
                    fs.close(fileDescriptor, (err) => {
                        (!err) ? callback(false, 'Info: File closed successfully') : callback(err, 'Error: File close failed');
                    });
                } else {
                    callback(err, 'Error: File write failed');
                }
            });
        } else {
            callback(err, 'Error: File open failed!');
        }
    });
}

// Read data from existing file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir}${dir}/${file}.json`, 'utf-8', (err, data) => {
        (!err) ? callback(false, data) : callback(err, 'Error: File read failed')
    });
}

// Update existing file with new data (Replce existing content)
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            callback(false, 'Info: File opened successfully');
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err) {
                    callback(false, 'Info: File truncated successfully')
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err) {
                            callback(false, 'Info: New data saved to file');
                            fs.close(fileDescriptor, (err) => {
                                (!err) ? callback(false, 'Info: File closed successfully') : callback(err, 'Error: File close failed')
                            });
                        } else {
                            callback(err, 'Error: File write failed');
                        }                        
                    });
                } else {
                    callback(err, 'Error: File truncate failed');
                }
            });
        } else {
            callback(err, 'Error: File open failed!');
        }
    });
}

// Delete file
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir}${dir}/${file}.json`, (err) => {
        (!err) ? callback(false, 'Info: File deleted successfully') : callback(err, 'Error: File delete failed')
    });
}

// Export above module
module.exports = lib;