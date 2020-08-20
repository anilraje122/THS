// Find checksum of a number - '153.226.36.132'

// convert a decimal number to binary
function decToBin(dec) {
    var carry_arr = [];

    // convert decimal to binary
    function decToBinCalc(dec) {
        if(dec == 0) { return };
        carry_arr.push(dec%2);
        decToBinCalc(Math.floor(dec/2));
    }
    decToBinCalc(dec);

    // form output string by reversing and joining the carry array.
    var carry_str = carry_arr.reverse().join('');

    // output should be 8 digits long. Add missing zeros to the output
    cur_len = carry_str.length;
    if(cur_len>8) { 
        console.log('ERROR: Ouput has more than 8 digits!'); 
        return;
    };
    req_len = 8-cur_len;
    while(req_len) {
        carry_str = '0' + carry_str;
        req_len--;
    }
    return carry_str;
}

// converting decimal inputs to binary outputs
function inputToBinArr(ip) {
    var ip_arr = ip.split('.')
    var op_arr = ip_arr.map(decToBin);
    return op_arr;
}

// Add two binary numbers (input should be given as string)
function addBinary(A, B) {
    /*
    Truth table : inputs: a,b,c-carry output: s-sum,c-carry
    a b c = s c
    0 0 0 = 0 0
    0 0 1 = 1 0 <- input and output carries are different. a==b and a!=input carry
    1 0 0 = 1 0
    1 0 1 = 0 1
    1 1 0 = 0 1 <- input and output carries are different. a==b and a!=input carry
    1 1 1 = 1 1
    
    sum = a^b^c (XOR - same input:0, diff input:1)
    */
    
    // initialize sum and carry
    var sum = '';
    var carry = 0;
    
    // find last index of inputs A and B
    var i = A.length - 1;
    var j = B.length - 1;
    
    // Iterating through each binary inputs from LSD to MSD
    while(i >=0 || j >=0) {
        var a = A[i] ? A[i] : '0';
        var b = B[j] ? B[j] : '0';
        
        // Find the sum by performing XOR operation on inputs and carry
        sum = String(a^b^carry) + sum;
        
        // Deal with the carry exception: Carry is inversed when both inputs are same and input A != carry
        if(a === b && a !== String(carry)){
            carry = Number(!carry);
        }
        i--;
        j--;
    }
    
    // If there is a carry exist at the end, add it to the sum
    if(carry) {
            sum = String(carry) + sum;
        }
    return sum;
}

//final conversion: Iterating through the binary array and calculating sum of all elements
function conversion(input) {
    var sum = '';
    for(var i=0; i<input.length; i++) {
        sum = addBinary(input[i], sum);
    }
    return sum;
}

// Find the checksum - inverse the input
function findchecksum(binStr) {
    var checksum = '';
    for(i in binStr) {
        checksum += Number(!Number(binStr[i]));
    }
    return checksum;
}

var binArray = inputToBinArr('153.226.36.132');
console.log(binArray);
var sum = conversion(binArray);
console.log(sum);
var checksum = findchecksum(sum);
console.log(checksum);