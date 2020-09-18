// Write a program to Check if the given input is even or odd 
// ES6 

isEvenOdd = (num) => {
    if(!Number.isInteger(num)) {
        console.log("Enter a valid integer!");
        return;
    }
    return (num%2 === 0)?'even':'odd';
}

console.log(`10 is ${isEvenOdd(10)}`);
console.log(`5 is ${isEvenOdd(5)}`);