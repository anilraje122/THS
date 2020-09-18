
// Write a program to Check if the given input is even or odd
// ES5

function isEvenOdd(num) {
    if (!Number.isInteger(num)) {
        console.log("Enter a valid integer!");
        return;
    } 
    if (num%2 === 0) {
        return "even";
    }
    return "odd";
}

console.log(`10 is ${isEvenOdd(10)}`);
console.log(`5 is ${isEvenOdd(5)}`);

