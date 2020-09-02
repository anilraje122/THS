/**********************************************

Write an algorithm to remove duplicate elements in a given input array and print the
total number of elements removed.

Sample Input : [1, 2, 2, 3, 4, 4, 4, 5, 5]
Sample OutPut : [ 1, 2, 3, 4, 5 ]
Number of Elements Removed : 4

***********************************************/

// get user inputs and display the output
main = () => {
    let arr = [];
    let readLineSync = require('readline-sync');
    console.log("\n-- Remove Duplicates from Array --");
    let arrLen = readLineSync.question("\nEnter Array Length : ");
    while(arrLen) {
        arr.push(readLineSync.question("Enter a number : "));
        arrLen--;
    }
    console.log(`\nInput : ${arr}`);
    findAndRemoveDuplicates(arr);
}

// find and remove duplicate elements and count each removal operation
findAndRemoveDuplicates = (arr) => {
    let count = 0;

    // remove duplicate elements of an array
    removeDuplicate = (arr) => {
        for(let i=0; i<arr.length; i++) {
            if(arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])) {
                arr.splice(i,1);
                count++;
            }
        }
        return arr;
    }
    
    console.log(`\nOutput : ${removeDuplicate(arr)}`);
    console.log(`\nNumber of elements removed : ${count}`);
}

main();
