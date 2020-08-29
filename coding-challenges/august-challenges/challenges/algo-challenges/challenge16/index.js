/**********************************************

Write an algorithm to print the below pattern.
Note : Number of lines should be taken as input.

Sample Input : 5
Sample Output:
1
21
321
4321
54321

***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Print Pattern --");
    let noOfLines = Number(readLineSync.question("\nEnter number of lines : "));
    let opStr = '';
    for(let i=1; i<=noOfLines; i++) {
        opStr = i + opStr;
        console.log(opStr);
    }
}

main();