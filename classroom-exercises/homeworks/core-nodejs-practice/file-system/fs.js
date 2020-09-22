// Imports
const fs = require('fs');
const util = require('util');

// Read file
const fnameR = 'test-read.txt';
readfile = (fnameR) => {
    fs.readFile(fnameR, (err, data) => {
        if(err) throw err ;
        console.log(`fs.readFile : Content of ${fnameR} : ${data.toString()}`);
    });
}
readfile(fnameR);

// Write file
const content = 'Hello World!';
const fnameW = 'test-write.txt';
writefile = (fnameW, content) => {
    fs.writeFile(fnameW, content, (err, data) => {
        if(err) throw err;
        console.log(`fs.writeFile : Content "${content}" is successfully written to ${fnameW}`);
    })
}
writefile(fnameW, content);

// Apppend file
const newContent = 'Welcome to Node.js';
const fnameA = 'test-append.txt';
appendfile = (fnameA, newContent) => {
    fs.appendFile(fnameA, `\n${newContent}`, (err, data) => {
        if(err) throw err;
        console.log(`fs.appendFile : Content "${newContent}" is successfully appended to ${fnameA}"`);
    })
}
appendfile(fnameA, newContent);

// Delete file
const fnameD = 'test-delete.txt';
function deleteFile (fnameD) {
    // Create a test file to delete it
    const writeFile = util.promisify(fs.writeFile);
    const readFile = util.promisify(fs.readFile);
    const deleteFile = util.promisify(fs.unlink);
    async function createTestFile() {
        try {
            await writeFile(fnameD, 'This is a temporary file created for testing fs unlink');
            console.log(`fs.unlink : File ${fnameD} is created for fs unlink testing!`);
            const fileContent = await readFile(fnameD);
            console.log(`fs.unlink : ${fnameD} content is : ${fileContent}`);
            await deleteFile(fnameD ); 
            console.log(`fs.unlink : File ${fnameD} is deleted!`);
        } catch (err) {
            console.log('Error Occured while creating the temp file for fs unlink operation!' + err );
        }
    }
    createTestFile();
}
deleteFile(fnameD);