/**********************************************

Write an algorithm to check if a given matrix is an identity matrix or not.

What is identity matrix : A square matrix in which all the elements of the principal diagonal are ones and all other elements are zeros.

More details : https://en.wikipedia.org/wiki/Identity_matrix

Matrix size must be n (n x n)

Output Format : Yes/No

Sample input : 
n : 2
array elements : 1 0 0 1
Sample output : 
Yes

Sample input : 
n : 2
array elements : 1 0 1 1
Sample output : 
No

***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("-- Identity Matrix --")
    let n = readLineSync.question("\nEnter matrix size, n : "); // matrix size is n x n
    let matrix = [];
    for(let row=0; row<n; row++) { // adding elements to matrix
        matrix[row] = new Array();
        for(let col=0; col<n; col++) {
            matrix[row][col] = Number(readLineSync.question("\nEnter a number : "));
        }
    }
    isIdentityMatrix(matrix)?console.log("\nYes"):console.log("\nNo");
}

// check if the given matrix is identity matrix or not
isIdentityMatrix = (matrix) => {
    let diagonalElementsArr = [];
    let restOfTheElements = [];
    for(let row=0; row<matrix.length; row++) {
        for(let col=0; col<matrix.length; col++) {
            if(row == col) {
                diagonalElementsArr.push(matrix[row][col]);
            } else {
                restOfTheElements.push(matrix[row][col]);
            }
        }
    }
    if (isArrValsEqual(diagonalElementsArr) && diagonalElementsArr[0] == 1 && isArrValsEqual(restOfTheElements) && restOfTheElements[0] == 0) return true;
    return false;
}

// check if all elements of array are same
isArrValsEqual = (arr) => {
    let sameElementCount = 1;
    for(let i=0; i<arr.length; i++) {
        if(arr[i] === arr[(i+1)]) {
            sameElementCount++;
        }
    }
    if(sameElementCount === arr.length) {
        return true;
    }
    return false;
}

main();
