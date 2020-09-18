
// Write a program to generate even and odd numbers less than 'N'
// ES6

evenOddLessThanN = (num) => {
    if (!Number.isInteger(num)) {
        console.log("Enter a valid integer!");
        return;
    }
    console.log(`even and odd numbers less than ${num} :`);
    for (var i=1; i<num; i++) {
        if (i%2 == 0) {
            console.log(`${i} is even`);
        } else {
            console.log(`${i} is odd`);
        }
    }
}

evenOddLessThanN(5);

// Generate 'N' even and odd numbers

function nEvenOdd(num) {
    let even_nums = [];
    let odd_nums = [];
    if(!Number.isInteger(num)) {
        console.log("\nEnter a valid integer!");
        return;
    }
    console.log(`\n${num} even and odd numbers :`);
    for(let i=1; i<=(num*2); i++) {
        (i%2 === 0)?even_nums.push(i):odd_nums.push(i);
    }
    console.log(`even numbers : ${even_nums}`);
    console.log(`odd numbers : ${odd_nums}`);
}

nEvenOdd(5);