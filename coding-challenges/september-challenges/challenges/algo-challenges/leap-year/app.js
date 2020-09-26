/**********************************************

Check if a given year is leap year
A year is leap year if the following conditions are satisfied:

Year is multiple of 400.
Year is multiple of 4 and not multiple of 100.

Input : 2000
Output : Leap Year

Input : 20001
Output : Not a Leap Year

***********************************************/

// Imports
const rls = require('readline-sync');

// Main function
main = () => {
    console.log('\n-- Check Leap Year --');
    const userInput = rls.question('\nEnter an Year : ');
    isLeapYear(userInput) ? console.log('\nLeap Year') : console.log('\nNot a Leap Year');
}

// Check if leap year or not
isLeapYear = (y) => {
    if(y%400 === 0) {
        return true;
    } else if(y%4 === 0 && y%100 !== 0 ) {
        return true;
    } else {
        return false;
    }
}

main();