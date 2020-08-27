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

// get user inputs
getInput = () => {
    let readLineSync = require('readline-sync');
    let inputStr = readLineSync.question("Enter a string : ");
    let inputKey = readLineSync.question("Enter key : ");
    console.log(inputStr, inputKey);
}

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

// encrypt the input string with the key
encryptDecrypt = (inputStr, inputKey) => {

    // converting input string to ascii array
    let inputStrAsciiArr = strToAscii(inputStr);
    let inputStrBinArr = [];

    // converting input key to ascii array
    let inputKeyAsciiArr = strToAscii(inputKey);
    let inputKeyBinArr = [];

    for(let i=0; i<inputStrAsciiArr.length; i++) {
        inputStrBinArr.push(decToBin(inputStrAsciiArr[i]));
    }

    for(let i=0; i<inputKeyAsciiArr.length; i++) {
        inputKeyBinArr.push(decToBin(inputKeyAsciiArr[i]));
    }
    return xor32bit(inputStrBinArr, inputKeyBinArr);
}

// find XOR of binary input string and binary key
xor32bit = (inputStrBinArr, inputKeyBinArr ) => {
    let strArrLen = inputStrBinArr.length;
    let keyArrLen = inputKeyBinArr.length;
    let sum = [];
    if(strArrLen != keyArrLen) {
        var maxLen = (strArrLen > keyArrLen)?strArrLen:keyArrLen;
    }

    // equalising 32 bits for the inputs
    while(strArrLen < maxLen ) {
        inputStrBinArr.unshift('00000000');
        strArrLen++;
    }
    while(keyArrLen < maxLen ) {
        inputKeyBinArr.unshift('00000000');
        keyArrLen++;
    }

    console.log(inputStrBinArr, inputKeyBinArr); // printing inputs
    
    let outputArr = [];
    let outputStrSum = '';
    // iterating through binary input string array and binary input key array and finding XOR of both
    for(let digitIndex = (inputStrBinArr.length - 1); digitIndex>=0; digitIndex--) { 
        outputStrSum = calcXor(inputStrBinArr[digitIndex], inputKeyBinArr[digitIndex])
        outputArr.push(outputStrSum);
    }
    return outputArr.reverse();
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

console.log(encryptDecrypt('ani','x'));

// now write binary to decimal calc 

