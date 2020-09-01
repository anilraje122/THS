// convert decimal input to binary
binConverter = (num) => {
    let carry = '';
    binToDec = (num) => {
        if(num === 0) {
            return 0;
        }
        carry += num%2;
        binToDec(Math.floor(num/2));
        return carry;
    }
    return binToDec(num).split('').reverse().join('');
}

// clear user inputs
clearInputOutput = () => {
    document.getElementById('outputText').value = '';
    document.getElementById('inputText').value = '';
}

// update output tag with converted value
updateOutput = () => {
    decNum = document.getElementById('inputText').value;
    if(isNaN(decNum)) {
        document.getElementById('outputText').value = 'Enter a valid number!!';
        return;
    }
    document.getElementById('outputText').value = binConverter(decNum);
}