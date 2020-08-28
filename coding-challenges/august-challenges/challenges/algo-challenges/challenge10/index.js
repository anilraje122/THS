/**********************************************

Write an algorithm to sort the given array elements using Bubble sort in descending
order and print the number of swaps happening.

Note : 
1. The input array should be given as a command line. 
   First take the length of the array from the user and the elements from the console.
2. The elements should be printed in descending order and total number of swaps.

***********************************************/

main = () => {
    let readLineSync = require('readline-sync');
    console.log("-- Bubble Sort - Descending Order --")
    let inputArrLen = readLineSync.question("\nEnter Array Length : ");
    let inputArr = [];
    while(inputArrLen) {
        inputArr.push(Number(readLineSync.question("Enter a number : ")));
        inputArrLen--;
    }
    bubbleSort(inputArr);
}

// perform bubble sort in descending order
bubbleSort = (inputArr) => {
    let numOfSwaps = 0;

    // compare and swap adjust elements of array
    compAndSwap = (inputArr) => {
        for(let i=0; i<inputArr.length; i++) {
            let j = i+1;
            if(inputArr[i] < inputArr[j]) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[j];
                inputArr[j] = tmp; 
                numOfSwaps++;
            }
        }
        return inputArr;
    }

    // If we have total n elements, then we need to repeat this process for n-1 times.
    let outArr = compAndSwap(inputArr);
    let len = outArr.length;
    while(len>0) {
        outArr = compAndSwap(outArr);
        len--;
    }
    console.log(`\nSorted Array : ${outArr}`);
    console.log(`No. of Swaps : ${numOfSwaps}`);
}

main();