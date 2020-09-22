first = () => {
    console.log("This is first function with no delay!");
}

setTimeout( second = () => {
    console.log("This is second function with 10sec delay");
    setTimeout( third = () => {
        console.log("This is third function with 5sec delay");
    }, 5000)
}, 10000);

first();

fourth = () => {
    console.log("This is fourth function with no delay!");
}

fourth();