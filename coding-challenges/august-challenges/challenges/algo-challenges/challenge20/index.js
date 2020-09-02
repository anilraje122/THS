/**********************************************

Write an algorithm to check

1. Whether the given input number is a multiple of 10.
2. If it is multiple of 10, Multiply given input with number 10 without using addition
and multiplication operators. (NO * +)
3. If it is not multiple of 10, Multiply given input with number 8 without using addition
and multiplication operators. (NO * +)

(Hint : Left Shift operator )

Sample Input 1: 5
Sample Output 1: 50

Sample Input 2: 3
Sample Output 2: 24

***********************************************/

// get user inputs and display the output
main = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Multiple of 10 --");
    let n = Number(readLineSync.question("\nEnter a number : "));
    
    if(isMultipleOfTen(n)) {
        console.log(multply(n, 10));
    } else {
        console.log(multply(n, 8));
    }
}

// check if the input is mulitple of 10
isMultipleOfTen = (n) => {
    return (n%10 === 0)?true:false;
}

// product of two numbers using left shift operator
multply = (n, m) => {
    ans = 0;
    count = 0;
    while (m) {
        if(m % 2 === 1) {
            ans += n << count;
        }

        count +=1;
        m = Math.floor(m/2);
    }
    return ans;
}

main();