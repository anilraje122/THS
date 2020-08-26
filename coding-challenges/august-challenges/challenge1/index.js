/*****

Given an array of positive integer elements.Print out the count of Prime
numbers and Narcissistic numbers from the array and remove those elements from the
array.

Prime number : A number that is divisible only by itself and 1
Eg: 2, 3, 5, 7, 11

Narcissistic number : An n-digit number that is the sum of the nth powers of its digits is called an n-narcissistic number.
Eg: 370 = 3^3 + 7^3 + 0^3. here 3 is length of the input number
Eg: 1634 = 1^4 + 6^4 + 3^4 + 4^4. here 4 is length of the input number

*****/

isPrime = (num) => {
    // prime number series starts with 2
    if(num<2) {
        return false;
    }
    // iterate through all numbers less than the input number
    for(let i=2; i<num; i++) {
        // check if the number is divisible by any of the lower number
        // prime can only be divided by itself and one.
        if(num % i === 0) {
            return false;
        }
    }
    return true;
}

isNarcissistic = (num) => {
    let numArr = num.toString().split('');
    let n = numArr.length;
    let sum = 0;
    numArr.forEach(element => {
        // find the nth power of each digit and calculate the sum of all results
        sum += Number(element)**n; 
    });
    if(num != sum) {
        return false;
    }
    return true;
}


getInput = () => {
    let inputArr = [];
    let readLineSync = require('readline-sync');
    let inputArrLen = Number(readLineSync.question("Enter array length, n : "));
    while(inputArrLen > 0) {
        inputArr.push(Number(readLineSync.question("Enter a number : ")));
        inputArrLen--;
    }
    return inputArr;
}

countAndRemove = (inputArr) => {
    let primeCount = 0;
    let narcissisticCount = 0;
    let eleToRemArr = [];
    
    // print original input array
    console.log(`Input array : ${inputArr}`);

    for(let i=0; i<inputArr.length; i++) {
        if(isPrime(inputArr[i])) {
            primeCount++; // counting all prime and narcissistic numbers
            eleToRemArr.push(inputArr[i]); // creating a new array with elements to be removed
        }
        if(isNarcissistic(inputArr[i])) {
            narcissisticCount++;
            eleToRemArr.push(inputArr[i]);
        }
    }

    // creating new array without prime and narcissistic numbers
    let newArr = inputArr.filter( (num) => {
        return eleToRemArr.indexOf(num) === -1;
    });
    
    // printing outputs
    console.log(`Number of prime numbers : ${primeCount}`);
    console.log(`Number of narcissistic numbers : ${narcissisticCount}`);
    console.log(`Array without prime and narcissistic numbers : ${newArr}`);
}

countAndRemove(getInput());



