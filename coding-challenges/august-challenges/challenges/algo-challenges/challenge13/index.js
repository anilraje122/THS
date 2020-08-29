/**********************************************

Write An Algorithm to check if a given number is in the following series:
4,16,64,256,1024,4096,16384.,......., 4^N
Note : Output will be yes/no

Sample input : 
n : 5
Sample output : 
No

Sample input : 
n : 16
Sample output : 
Yes


***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Crack the Series --")
    let n = readLineSync.question("\nEnter a number : ");
    checkNum(n)?console.log('\nYes'):console.log('\nNo'); // print yes if checkNum returns true
}

// check if the input number is part of ther series
checkNum = (n) => {
    let isValid = false;

    while(n) {
        if(n>0 && n/4 === 1) { // confirm that input is a positive integer and quotient of input and 4 is 1
            isValid = true;
        }
        n /=4; // lowering the n value to check until 1
    }
    return isValid;
}

main();



