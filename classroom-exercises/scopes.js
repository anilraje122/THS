/*

1. Global scope : inside window object
2. Block level scope : inside {}
3. Function scope : inside functions

var, let and const are used to manage the scopes
Hoisting - method to access the values from outer block to inner block
*/

let a = 1;
let b = "apple";

// global scope
console.log(a,b);

// block scope
{
    console.log(a,b); //Hoisting
}

//--------------------------------

{
    var c = 2; // var variables are available outside of this block 
    var d = "banana";
    let e = 3; // let variables are private to this block
    let f = "orange";
}

console.log(c,d);
// console.log(e,f); //commented this line to skip the error

//---------------------------------

var i = 100;
for(let i=0; i<4; i++) {
    console.log(i);
}
console.log(i);

//---------------------------------



