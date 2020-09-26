/**********************************************

check whether a given number is a "DUCK NUMBER" or not. A Duck number is a positive number which has zeroes present in it,
Please note that a numbers with only leading 0s is not considered as Duck Number.For example, numbers like 035 or 0012 are not considered as Duck Numbers. 
A number like 01203 is considered as Duck because there is a non-leading 0 present in it.

Input : 707069
Output : It is a duck number.

Input : 02364
Output : It is not a duck number.

***********************************************/

// Imports
const rls = require('readline-sync');

// Get user input and process the
main = () => {
    console.log("\n-- Duck Number --");
    const userInput = String(rls.question("\nEnter a number : "));
    isDuckNumber(userInput) ? console.log('\nIt is a Duck Number') : console.log('\nIt is Not a Duck Number');
}

// 
isDuckNumber = (inputStr) => {
    if(inputStr.lastIndexOf(0) !== -1 && inputStr.lastIndexOf(0) !== 0) {
        return true;
    }
    return false;
}

main();