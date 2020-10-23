/* Imports */
const readlineSync = require('readline-sync');
const path = require('path');
const data = require('./data');

/* Get all files and folders recursively */
let result = {};

/* Fill result variable with file tree object */
gatherFiles = async (dir, resultObject) => {
    try {
        const dirItems = await data.readDirectory(dir);
        for(let i=0; i<dirItems.length; i++) {
            let name = dirItems[i];
            let target = path.join(dir,'/',name);
            const status = await data.readStat(target);
            if(status.isDirectory()) {
                resultObject[name] = {};
                await gatherFiles(target, resultObject[name])
            } else {
                resultObject[name] = target;
            }
        }
    } catch (err) {
        console.log(err);
    }    
}

/* Get user input, create and display the file tree object */
main = async () => {
    console.log('\n-- List all files/directories recursively --');
    const userInput = readlineSync.question('\nEnter the directory name : ');
    await gatherFiles(userInput, result);
    console.log('\n' + JSON.stringify(result, null, 4));
}

main();
