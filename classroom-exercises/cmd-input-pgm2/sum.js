// install readline-sync using this command before using it
// npm i readline-sync
var readLineSync = require('readline-sync');
var num1 = readLineSync.question("Enter first number : ");
var num2 = readLineSync.questionInt("Enter second number : ");
var email = readLineSync.questionEMail("Enter you email id : ");
var passwd = readLineSync.questionNewPassword("Enter your password : ");

console.log(num1, num2, email, passwd);