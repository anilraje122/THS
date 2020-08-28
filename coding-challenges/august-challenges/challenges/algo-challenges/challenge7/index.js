/**********************************************

Write an Algorithm to take an input String ‘S’ with length ‘N’, 
split the string into two strings based on even and odd indexes.
While left padding the sub string with ‘000’ and right padding the substring with ‘111’.

Sample Input 1 :
code.in
Sample Output 1 :
000cd.n111
000oei111

Sample Input 2 :
Hello there
Sample Output 2 :
000Hlotee111
000el hr111

***********************************************/

main = () => {
    let readLineSync = require('readline-sync');
    console.log("\n-- Split Strings --")
    let inputStr = readLineSync.question("\nEnter a String : ");
    let resStrArr = splitStr(inputStr);
    resStrArr.forEach(element => console.log(element));
}

splitStr = (inputStr) => {
    let evenStr = '';
    let oddStr = '';
    for(let i=0; i<inputStr.length; i++) {
        if(i % 2 === 0) {
            evenStr += inputStr[i];
        } else {
            oddStr += inputStr[i];
        }
    }
    return [paddStr(evenStr), paddStr(oddStr)]
}

paddStr = (str) => {
    str = '000' + str + '111';
    return str;
}

main();