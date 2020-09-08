// blocking, non blocking

// console.log("hi");

console.time();

function abc() {
    setTimeout(() => {
        console.log("bye");
    }, 2000);
}

abc();

function def() {
    setTimeout(function() {
        console.log("Im alert");
    }, 2000);
}

def();

console.timeEnd();

// console.log("done");