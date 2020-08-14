
// Write a program to subtract two integers without using Minus (-) operator

function sub(num1, num2) {
    var sub = 0;
    sub = ~num2;   // 1's complement
    sub = sub + 1; // 2's complement
    sub = sub + num1;
    return sub;
}

console.log(sub(30,20));