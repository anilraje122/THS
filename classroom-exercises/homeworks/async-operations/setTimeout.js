// let testFun = () => {
//     console.log("first");
//     setTimeout( () => {
//         console.log("second - delayed");
//     }, 5000);
//     console.log("three");
//     setTimeout( () => {
//         console.log("fourth - delayed");
//     }, 2000);
// }

(testFun = () => {
    console.log("first");
    setTimeout( () => (console.log("second - delayed")), 5000);
    console.log("three");
    setTimeout( () => (console.log("fourth - delayed")), 2000);
})();

// let isEven = (num) => ( num%2 === 0 );
// console.log(isEven(1002));
