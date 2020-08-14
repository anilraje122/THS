
// Write a program to Check if the given input is even or odd

function isEvenOdd(num) {
    if (!Number.isInteger(num)) {
        console.log("Enter a valid integer!")
    } 
    if (num%2 == 0) {
        return "even";
    }
    return "odd";
}

console.log(isEvenOdd(101));

