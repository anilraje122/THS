/**********************************************

Write an Algorithm to check the frequency(count) of odd numbers and even numbers
in the given input matrix.

Note:
1. Input should ask for size of matrix i.e (MXN) M rows, N col
2. All matrix elements should be taken as command line inputs

Sample input : 
m : 2
n : 2
array elements : 1 2 3 4
Sample output : 
Number of Even Numbers : 2
Number of Odd Numbers : 2

***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Even & Odd Numbers of Matrix --");
    let rows = Number(readLineSync.question("\nEnter number of rows : "));
    let cols = Number(readLineSync.question("\nEnter number of columns : "));
    let matrix = [];
    let countEven = 0;
    let countOdd = 0;
    
    for(let row=0; row<rows; row++) {
        matrix[row] = new Array();
        for(let col=0; col<cols; col++) { // adding elements to matrix
            matrix[row][col] = Number(readLineSync.question("\nEnter a number : "));
            isEven(matrix[row][col])?countEven++:countOdd++; // counting even and odd inputs
        }
    }
    console.log(`\nNumber of Even Numbers : ${countEven}`);
    console.log(`Number of Odd Numbers  : ${countOdd}`);
}

// check if the input is even or not
isEven = (num) => {
    return (num%2 === 0)?true:false;
}

main();