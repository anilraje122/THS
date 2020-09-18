
// Write a program to subtract two integers without using Minus (-) operator
// ES6

sub = (num1, num2) => {
    let sub = 0;
    sub = ~num2;   // 1's complement
    sub++; // 2's complement
    sub += num1;
    return sub;
}

console.log(sub(100,20));