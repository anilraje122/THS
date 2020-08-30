/**********************************************

Crack the series 2 15 41 80 132 197 275 366 470 587 . . .

B. Write an algorithm to produce the above number series until ‘N’ where N is a
positive integer.

Note : Input N should be taken as command line input.

Sample Input : 50
Sample Output: 2 15 41


***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Crack the Series 1 --")
    let n = readLineSync.question("\Enter a number : ");
    const const13 = 13;
    let sum = 2;
    for(let i=0; i<=n; i++) {
        sum += (const13 * i); // sum = sum + (13 * i) where i = 0 to n
        if(sum < n) { 
            console.log(sum);
        }
    }
}

main();