// Find checksum of a number - '153.226.36.132'

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

function inputToBinArr(ip) {
    var ip_arr = ip.split('.')
    var op_arr = ip_arr.map(decToBin);
    return op_arr;
}

console.log(inputToBinArr('10.8.4.2'));

// function binToDec(bin) {
//     var dec = 0;
//     var binArrRev = bin.split('').reverse().join('');
//     for(i=0; i<binArrRev.length; i++) {
//         dec += binArrRev[i] * (2**i)
//     }
//     return dec;
// }

    

