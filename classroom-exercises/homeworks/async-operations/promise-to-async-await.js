// promisify method
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function fileReader() {
    try {
        const res = await readFile('ip.txt')
        console.log(res.toString());
    } catch(err) {
        console.log("something went wrong! "+ err)
    }
}

fileReader();

