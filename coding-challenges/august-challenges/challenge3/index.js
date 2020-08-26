/**********************************************

Create an interactive command line program that continually takes a command line 
input from the user until the number is multiple of 11.

Sample Input 1 :
Enter the number : 5

Expected Output format :
5 is not multiple of 11. Try again.

Note : The command line input should not quit until the user enters a number which is
multiple of 11. It should keep asking for a new input number.

How to run this program : npm run challenge3

***********************************************/

getInput = () => {
    let readLineSync = require('readline-sync');
    while(true) {
        let input = Number(readLineSync.question("\nEnter the number : "));
        if(isMultipleOfEleven(input)) {
            console.log(`${input} is multple of 11. Exiting..`);
            break;
        }
        console.log(`${input} is not multiple of 11. Try again..`);
    }
}

isMultipleOfEleven = (num) => {
    return (11%num === 0)?true:false;
}

getInput();