// 1) Create a new text file name as current date and take user data from command line
// 2) read the file data, console log the file data, 
// 3) once console logged the file data, file should be deleted automatically.

const readlineSync = require("readline-sync");
const fs = require('fs');
const util = require('util');

const d = new Date();
const today = d.toString().slice(4, 15).split(' ').join('-') + '.txt';
let userInput = readlineSync.question("Enter data : ");

// method 1 - using call back
function fileOps() {
    fs.writeFile(today, userInput, (err)=> {
        if(err) {
            throw err;
        }
        console.log('Input saved to '+today);
    });

    fs.readFile(today, (err, data) => {
        if(err) {
            throw err;
        }
        console.log(data.toString());
        fs.unlink(today, (err) => {
            if(err) {
                throw err;
            }
            console.log("File removed!");
        });
    });
}

// fileOps();

// method 2 - using promisify
function fileOps2() {
    const writeFile = util.promisify(fs.writeFile);
    const readFile = util.promisify(fs.readFile);
    const removeFile = util.promisify(fs.unlink);

    writeFile(today, userInput)
    .then(()=>{
        console.log('Input saved to '+ today);
        return readFile(today);
    })
    .then((data)=>{
        console.log('File content : '+ data.toString());
        return removeFile(today);
    })
    .then(()=>{
        console.log("File removed!");
    })
    .catch((err)=>{
        console.log("Error occured!");
    })
}

// fileOps2();

// method 3 - using async-await
function fileOps2() {
    const writeFile = util.promisify(fs.writeFile);
    const readFile = util.promisify(fs.readFile);
    const removeFile = util.promisify(fs.unlink);
    async function actions() {
        try {
            await writeFile(today, userInput);
            console.log('Input saved to '+ today);
            const data = await readFile(today);
            console.log('File content : '+ data.toString());
            await removeFile(today);
            console.log("File removed!");
        } catch(err) {
            console.log('Error occured!'+ err);
        }
    }
    actions();
}

// fileOps2();

// method 4 - using promises
function fileOps3() {
    function writeFile(today, userInput) {
        return new Promise((resolve, reject) => {
            fs.writeFile(today, userInput, (err, data) =>{
                if(err) {
                    reject(err)
                } else {
                    resolve();
                }
            })
        });
    }
    function readFile(today) {
        return new Promise((resolve, reject) => {
            fs.readFile(today, (err, data)=> {
                if(err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            })
        });
    }
    function removeFile(today) {
        return new Promise((resolve, reject) => {
            fs.unlink(today, (err, data)=> {
                if(err) {
                    reject(err)
                } else {
                    resolve();
                }
            })
        });
    }

    writeFile(today, userInput)
    .then(()=>{
        debugger;
        console.log('Input saved to '+ today);
        return readFile(today);
    })
    .then((data)=>{
        debugger;
        console.log('File content : '+ data.toString());
        return removeFile(today);
    })
    .then(()=>{
        debugger;
        console.log("File removed!");
    })
    .catch((err)=>{
        console.log("Error occured!");
    })
}

fileOps3();
