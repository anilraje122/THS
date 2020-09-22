/*
Note : Ask your instructor to set up a Node End API point that takes $URL/number1/number2
and returns the sum of the numbers.
Test API : If you ping URL/2/3 , the response should be 5.
Problem :
● Hit the above API with axios by giving the two numbers from command line as input
● After receiving the sum of the above two numbers from the API, take the third number
from the command line input and hit the API again with sum and third number.
● Return the final sum of three numbers.
● Note : Take third number input only after receiving the sum of the first entered two
numbers.
● This is another demonstration of promise chaining.
*/
const readlineSync = require("readline-sync");
const axios = require("axios");
const URL = 'http://localhost:5000/add';
const num1 = readlineSync.question("Enter First Number : ");
const num2 = readlineSync.question("Enter Second Number : ");

async function hitSum(num1,num2){
    try {
        const res1 = await axios.get(`${URL}/${num1}/${num2}`);
        console.log(res1.data);
        const num3 = readlineSync.question("Enter Third Number : ");
        const res2 = await axios.get(`${URL}/${res1.data}/${num3}`);
        const num4 = readlineSync.question("Enter Fourth Number : ");
        const res3 = await axios.get(`${URL}/${res2.data}/${num4}`);
        console.log(res3.data);
    } catch(err) {
        console.log("Error occured!"+ err)
    }   
}

hitSum(num1, num2);
