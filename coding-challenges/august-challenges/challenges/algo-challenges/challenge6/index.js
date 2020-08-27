/**********************************************

Write an Algorithm to accept a number as a command line input. 
Check for the number is a Prime Number or not. 
If it's a prime number, print the multiplication table of the number.

Sample Input 1 : 2
Sample Output 1 :
2 is a Prime Number.
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
2 x 4 = 8
2 x 5 = 10
2 x 6 = 12
2 x 7 = 14
2 x 8 = 16
2 x 9 = 18
2 x 10 = 20

Sample Input 2 : 4
Sample Output 2 : 4 is not a prime number.

Note: The input number should be given as a command line. 
Program should keep asking for numbers until the user terminates with ‘N’

What is Prime number : A number that is divisible only by itself and 1
Eg: 2, 3, 5, 7, 11

***********************************************/

// get user input
getInput = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Prime Numbers --")
    let num = readLineSync.question("\nEnter Prime Number : ");

    // keep asking for the input till user provides a prime number
    while(!isPrime(num)) {
        num = readLineSync.question(`\n${num} is Not a Prime Number, Try again : `);
    }
    console.log(`\n${num} is a Prime Number`);
    multiplicationTable(num);
}

// check if a number is prime or not
isPrime = (num) => {
    if(num < 2) {
        return false;
    }
    for(let i=2; i<num; i++) {
        if(num%i == 0) {
            return false;
        }
    }
    return true;
}

// print muliplication table of a number
multiplicationTable = (num) => {
    for(let i=1; i<=10; i++) {
        let product = i*num;
        console.log(`${num} x ${i} = ${product}`);
    }
}

getInput();