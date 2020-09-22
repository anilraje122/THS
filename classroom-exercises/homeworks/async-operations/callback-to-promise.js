
const fs = require('fs');
const util = require('util');

// call back method
fs.readFile('ip.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log(data.toString());
});

// promise method
function fileReader() {
    return new Promise ((resolve, reject) => {
        fs.readFile('ip.txt', (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data.toString());
        });
    });
}

fileReader()
    .then((res) => {
        console.log(res);
    })
    .catch(() => {
        console.log(err);
    });

// promisify method
const readFile = util.promisify(fs.readFile);

readFile('ip.txt')
    .then((res) => {
        console.log(res.toString());
    })
    .catch((err) => {
        console.log("something went wrong! "+ err)
    });

// async-await method

const readFile2 = util.promisify(fs.readFile);
async function fileReader2() {
    try {
        const data = await readFile2('ip.txt');
        console.log(data.toString());
    } catch(err) {
        console.log("Error occured!"+ err);
    } 
}

fileReader2();