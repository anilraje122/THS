/**********

The ASCII challenge :

Write an Algorithm to extract input English Language sentence characters and
convert the characters to the 8-bit BINARY patterns. Import the ASCII Object
attached into your source code.

***********/


// Building ASCII object
function build_ascii_obj() {
    var ascii = {}
    
    // Adding ASCII values of a-z
    for (var ascii_code="a".charCodeAt(0); ascii_code<="z".charCodeAt(0); ascii_code++) {
        var ascii_char = String(String.fromCharCode(ascii_code));
        ascii[ascii_char] = ascii_code;
    }
    
    // Adding ASCII values of A-Z
    for (var ascii_code="A".charCodeAt(0); ascii_code<="Z".charCodeAt(0); ascii_code++) {
        var ascii_char = String(String.fromCharCode(ascii_code));
        ascii[ascii_char] = ascii_code;
    }
    
    // Adding ASCII values of special characters
    for (var ascii_code=" ".charCodeAt(0); ascii_code<="/".charCodeAt(0); ascii_code++) {
        var ascii_char = String(String.fromCharCode(ascii_code));
        ascii[ascii_char] = ascii_code;
    }
    
    // Adding ASCII values of numbers
    for (var ascii_code="0".charCodeAt(0); ascii_code<="9".charCodeAt(0); ascii_code++) {
        var ascii_char = String(String.fromCharCode(ascii_code));
        ascii[ascii_char] = ascii_code;
    } 
    
    return ascii
}

// converting input to ascii list
function convert_input_to_ascii(input_string) {
    var input_string_ascii_list = [];
    var ascii_obj = build_ascii_obj();
    for(char in input_string){
        input_string_ascii_list.push(ascii_obj[input_string[char]]);
    }
    return input_string_ascii_list;
}

var op = [];

// converting decimal to binary
function dec_to_bin(n) {
    if (n==0) return ;
    op.push(Math.floor(n%2))
    dec_to_bin(Math.floor(n/2));
    return op
}

// collating the values and printing
function convert_name_to_binary(pgm_input) {
    var ascii_list = convert_input_to_ascii(pgm_input);
    console.log(`Pgm Input : ${pgm_input}`)
    console.log(`ASCII Decimal Value : ${ascii_list}`)
    var final_list = [];
    for(i in ascii_list) {
        final_list.push(dec_to_bin(ascii_list[i]).reverse().join().replace(/[ ,.]/g,''));
        op = [];
    }
    
    // prepending zeros to the binary output when total number of digits are less than 8
    for(i in final_list){
        if(final_list[i].length < 8){
            var zeros_required = 8-final_list[i].length;
            while(zeros_required){
                final_list[i] = "0"+final_list[i];
                zeros_required--;
            }
        }
    }
    console.log(`Binary Value : ${final_list}`)
}

convert_name_to_binary("hello");