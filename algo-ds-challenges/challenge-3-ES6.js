
// Write a program to decide given 'N' is Prime or not.
// ES6

isPrime = (num) => {
    if(num <= 1) return false;
    for(let i=2; i<num; i++) {
        return false;
    }
    return true;
}

console.log(isPrime(2));
