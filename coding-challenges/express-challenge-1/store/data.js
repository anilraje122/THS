/* Imports */
const fs = require('fs');
const util = require('util');
const path = require('path');
const os = require('os');

/* Global vars */
const data = {};
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);
const stat = util.promisify(fs.stat);
const baseDir = path.join(__dirname + '/..');

/* Write new file */
data.write = async (dir, file, data) => {
    try {
        await writeFile(`${baseDir}/${dir}/${file}.txt`, data + os.EOL);
        return Promise.resolve();
    } catch (err) {
        console.log('write error');
        return Promise.reject(err);
    }
}

/* Read file */
data.read = async (dir, file) => {
    try {   
        const fileData = await readFile(dir, file);
        return Promise.resolve(fileData);
    } catch (err) {
        console.log('read error');
        return Promise.reject(err);
    }
}

/* Update file */
data.update = async (dir, file, newData) => {
    try {   
        await appendFile(`${baseDir}/${dir}/${file}.txt`, newData + os.EOL);
        return Promise.resolve();
    } catch (err) {
        console.log('update error');
        return Promise.reject(err);
    }
}

/* Get file size */
data.readStats = async (dir, file) => {
    try {   
        const fileStats = await stat(`${baseDir}/${dir}/${file}.txt`);        
        const fileSizeBytes = parseFloat(fileStats.size);
        return Promise.resolve(fileSizeBytes);
    } catch (err) {
        console.log('readstats error');
        return Promise.reject(err);
    }
}

/* Find and sort recent log files as per modified time */
data.orderRecentFiles = (dir) => {
    try {
        return fs.readdirSync(dir)
            .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
            .map(file => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    } catch (err) {
        // console.log(err);
        return [];
    }
    
};

/* Find recent modified log file */
data.getMostRecentFile = (dir) => {
    try {                   
        const files = data.orderRecentFiles(`${baseDir}/${dir}/`);
        return (files[0].file.replace('.txt',''));
    } catch (err) {
        // console.log(err);
        return false;
    }
};

/* Exports */
module.exports = data;