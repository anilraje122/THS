/**********************************************

Write an algorithm to rotate the bits of a given input number.
Bit Rotation : A rotation (or circular shift) is an operation similar to shift except that the
bits that fall off at one end are put back to the other end.
In left rotation, the bits that fall off at left end are put back at right end.
In right rotation, the bits that fall off at right end are put back at left end.

Example :
Left Rotation of 16 by 2 is 64
Right Rotation of 16 by 2 is 4

***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("\nBit Rotation using binary conversion");
    let n = readLineSync.question("\nEnter a number : ");
    if(isNaN(n)) {
        console.log("\nEnter a valid number!");
        return;
    }
    console.log(`\nLeft rotation by 2 : ${rotateBits(n, 2, 'left')}`);
    console.log(`Right rotation by 2 : ${rotateBits(n, 2, 'right')}`);
}

// decimal to binary conversion
decToBin = (n) => {
    let carry = '';
    let bin;
    conversion = (n) => {
        if(n === 0) {
            return n;
        }
        carry += n%2;
        conversion(Math.floor(n/2));
        return carry;
    }
    bin = conversion(n).split('').reverse().join('');
    return bin; // returns a string
}

// binary to decimal conversion
binToDec = (n) => {
    let dec = 0;
    let j = 0;
    for(let i=(n.length -1); i>=0; i--) {
        dec += n[i] * (2**j)
        j++;
    }
    return dec;
}

// padding zeros 
paddBits = (bin, nob) => { // bin = binary input, nob = total no. of bits required
    let reqBits = nob - bin.length;
    for(i=0; i<reqBits; i++) {
        bin = '0' + bin;
    }
    return bin;
}

// rotate bits to left or right
rotateBits = (n, nor, dir) => { // n = decimal number, nor = no. of rotation, dir = direction
    let bin = decToBin(n);
    bin = paddBits(bin, 8); // make it 8bits longer
    let strArr = bin.split('');
    let firstElement;
    let lastElement;
    while(nor) {
        if(dir === 'left') {
            firstElement = strArr.shift();
            strArr.push(firstElement);           
        } 
        else {
            lastElement = strArr.pop();
            strArr.unshift(lastElement);
        }
        nor--;
    }
    bin = strArr.join(''); 
    return binToDec(bin);
}

main();