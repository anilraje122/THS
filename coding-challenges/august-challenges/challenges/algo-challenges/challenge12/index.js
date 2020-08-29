/**********************************************

Write an algorithm to find given a matrix, check whether it’s magic square or not.
(HINT:A Magic square is whose sum of elements diagonally,vertically,horizontally are
equal)

Note : Input Matrix will be given to NxN elements. 2X2, 3X3, 4X4 etc.
N should be taken from the command line.

Sample input : 
n : 3
array elements : 2 7 6 9 5 1 4 3 8
Sample output : 
Yes

Sample input : 
n : 2
array elements : 1 2 3 4
Sample output : 
Yes



***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("-- Magic Square --")
    let n = readLineSync.question("\nEnter matrix size, n : "); // matrix size is n x n
    let matrix = [];
    for(let row=0; row<n; row++) {
        matrix[row] = new Array(); // initializing row 
        for(let col=0; col<n; col++) {
            matrix[row][col] = Number(readLineSync.question("Enter a number : "));
        }
    }
    console.log(isMagicSquare(matrix)?'\nYes, It is a Magic Square!':'\nNo, It is not a Magic Square!');
}

// check if all array elements are equal
isAllValEqual = (arr) => {
    let count = 1;
    for(let i=0; i<(arr.length - 1); i++) {
        if(arr[i] === arr[(i+1)]) {
            count++;
        }
    }
    if(count === arr.length) {
        return true;
    }
    return false;
}

// chech if sum of all row elements are equal
isRowSumEqual = (matrix) => {
    let rowSum = [];
    let sum = 0;
    for(let row=0; row<matrix.length; row++) {
        for(let col=0; col<matrix.length; col++) {
            sum += matrix[row][col];
        }
        rowSum.push(sum);
        sum = 0;
    }
    return isAllValEqual(rowSum);
}

// check if sum of all column elements are equal
isColSumEqual = (matrix) => {
    let colSum = [];
    let sum = 0;
    for(let row=0; row<matrix.length; row++) {
        for(let col=0; col<matrix.length; col++) {
            sum += matrix[col][row];
        }
        colSum.push(sum);
        sum = 0;
    }
    return isAllValEqual(colSum);
}

// check if sum of all diagonal elements are equal
isDigonalSumEqual = (matrix) => {
    let leftDigonalsum = 0;
    let rightDigonalsum = 0;

    // calculate sum of left diagonal elements
    for(let row=0; row<matrix.length; row++) {
        for(let col=0; col<matrix.length; col++) {
            if(row === col) {
                leftDigonalsum += matrix[row][col];
            }
        }
    }

    // calculate sum of right diagonal elements
    for(let row=(matrix.length-1); row>=0; row--) {
        for(let col=(matrix.length-1); col>=0; col--) {
            if(row === col) {
                rightDigonalsum += matrix[row][col];
            }
        }
    }

    // compare left and right diagonal sums
    if(leftDigonalsum === rightDigonalsum) {
        return true;
    }
    return false;
}

// check if all sums are equal
isMagicSquare = (matrix) => {
    if (isRowSumEqual(matrix) && isColSumEqual(matrix) && isDigonalSumEqual(matrix)) {
        return true;
    }
    return false;
}

main();