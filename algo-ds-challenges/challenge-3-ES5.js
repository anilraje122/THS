
// Write a program to decide given 'N' is Prime or not.
// ES5

function isPrime(num) {
    if(num <=1 ) {
        return false;
    }
    for(var i=2; i<num; i++) {
        if(num%i == 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(2));
