/**********************************************

Crack the series 1 2 3 6 9 18 27 54 . . .

B. Write an algorithm to produce the above number series until ‘N’ where N is a
positive integer.
Note : Input N should be taken as command line input.

Sample Input : 10
Sample Output: 1 2 3 6 9 

***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Crack the Series 2 --");
    let n = Number(readLineSync.question("\nEnter a number : "));
    let sum = 0;
    const const3 = 3;
    for(let i=0; i<n; i++) {
        sum = const3**i; // sum = (3 ** i) where i = 0 to n
        if (sum < n) { 
            console.log(sum);
            sum = sum + (const3**i); // sum = sum + (13 ** i) where i = 0 to n
            if (sum > n) { return; };
            console.log(sum);
         }
    }   
}

main();