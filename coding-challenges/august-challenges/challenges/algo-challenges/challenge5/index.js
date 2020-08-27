/**********************************************

Write an Algorithm to encrypt and decrypt an input string using XOR Cipher
Algorithm.

About XOR Cipher : https://en.wikipedia.org/wiki/XOR_cipher

Sample Input String 1 : abcd
Enter Key : A
Out Encrypted String : #"%

Sample Input String 1 : i can code
Enter Key : M
Out Encrypted String : $m.,#m.")(

Note : String can be anything. Use ASCII values of string characters to perform
XOR. Key could be anything. The same key will be used to decrypt.

How to run this program : npm run challenge5

***********************************************/

let inputS = '';
let inputK = '';

// convert input string to ascii decimal
strToAscii = (inputStr) => {
    let strAsciiArr = [];
    for(let index=0; index<inputStr.length; index++) {
        strAsciiArr.push(inputStr[index].charCodeAt(0));
    }
    return strAsciiArr;
}

// convert decimal number to 8-bit binary
decToBin = (dec) => {
    let binArr = [];
    let reminder = 0;
    conv = (dec) => {
        if (dec > 0) {
            reminder = dec%2;
            binArr.push(reminder);
            conv(Math.floor(dec/2));
        }
    }
    conv(dec);
    let result = binArr.reverse().join('');
    result = pad8Bit(result);
    return result;
}

// 8 bit padding
pad8Bit = (binStr) => {
    curLen = binStr.length;
    while (curLen < 8) {
        binStr = '0' + binStr;
        curLen++;
    }
    return binStr;
}

// find XOR of 32 bit binary input string and 8 binary key
xor32bit = (inputStrBinArr, inputKeyBinArr ) => {
    let strArrLen = inputStrBinArr.length;
    let keyArrLen = inputKeyBinArr.length;
    let sum = [];
    let outputArr = [];
    let outputStrSum = '';
  
    // padding key array with the same key set to match with input string array length
    while(keyArrLen < strArrLen) {
        inputKeyBinArr.unshift(inputKeyBinArr[0]);
        keyArrLen++;
    }

    // iterating through binary input string array and binary input key array and finding XOR of both
    for(let digitIndex = (inputStrBinArr.length - 1); digitIndex>=0; digitIndex--) { 
        outputStrSum = calcXor(inputStrBinArr[digitIndex], inputKeyBinArr[digitIndex])
        outputArr.push(outputStrSum);
    }
    outputArr = outputArr.reverse();
    return outputArr;
}

// calculate XOR of two 8 bit binary inputs
calcXor = (binStr1, binStr2) => {
    let binStrArr1 = binStr1.split('');
    let binStrArr2 = binStr2.split('');
    let sum = 0;
    let sumArr = [];
    for(let digitIndex = (binStrArr1.length - 1); digitIndex>=0; digitIndex--) {
        sum = Number(binStrArr1[digitIndex]) ^ Number(binStrArr2[digitIndex]);
        sumArr.push(sum);
    }
    return sumArr.reverse().join('');
}

// convert binary string to decimal
binToDec = (binStr) => {
    let sum = 0;
    let muliplicand = 0;
    for(let bitIndex = (binStr.length - 1); bitIndex>=0; bitIndex--) {
        sum += (Number(binStr[bitIndex]) * (2**muliplicand));
        muliplicand++;
    }
    return sum;
}

// encrypt the input string with the key provided
encryptDecrypt = (inputStr, inputKey) => {

    let inputStrBinArr = [];
    let inputKeyBinArr = [];
    let xorOutputArr = [];
    let encryptedString = '';
    let encryptedStringArr = []; // just to display the error

    // converting input string to ascii array
    let inputStrAsciiArr = strToAscii(inputStr);
    
    // converting input key to ascii array
    let inputKeyAsciiArr = strToAscii(inputKey);

    // converting ascii array to bin array
    for(let i=0; i<inputStrAsciiArr.length; i++) {
        inputStrBinArr.push(decToBin(inputStrAsciiArr[i]));
    }
    for(let i=0; i<inputKeyAsciiArr.length; i++) {
        inputKeyBinArr.push(decToBin(inputKeyAsciiArr[i]));
    }

    // getting XOR output of string input and key
    xorOutputArr = xor32bit(inputStrBinArr, inputKeyBinArr);

    // convert the XOR output to ASCII charcters
    for(let i=0; i<xorOutputArr.length; i++) {
        encryptedString += String.fromCharCode(binToDec(xorOutputArr[i]));
        encryptedStringArr.push(String.fromCharCode(binToDec(xorOutputArr[i])));
    }
        
    // console.log(encryptedStringArr); // Unable to print few ASCII chars. Eg: \u000f. Sample key : m
    return encryptedString;
}

// get user inputs
getInput = () => {
    let readLineSync = require('readline-sync');
    readLineSync.setDefaultOptions({keepWhitespace: true});
    console.log("\n-- XOR Cipher --")
    inputS = readLineSync.question("\nEnter a String : ");
    inputK = readLineSync.question("Enter a Key : ");
    if(inputK.length !== 1) {
        console.log('\nKey should be a single digit or alphabet! Program exiting..');
        return;
    }
    let encryptedString = encryptDecrypt(inputS, inputK);
    console.log('\nEncrypted String : '+ encryptDecrypt(inputS, inputK));
    console.log('Decrypted String : '+ encryptDecrypt(encryptedString, inputK));
}

getInput();