/**********************************************

Write an algorithm to check given an integer x, Write a function that multiplies x with 3.5 and
returns the integer result.
You are not allowed to use %, /, *.

Input: 5
Output: 17 (Ignore the digits after decimal point)

***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Multiply with 3.5 --");
    let x = readLineSync.question("\Enter a number : ");
    console.log(mulitply(x));
}

mulitply = (x) => {
    let y = 3.5;
}