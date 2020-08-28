/*************************

Given a non-empty array of integers, every element appears twice except for one. Find that single one.
Note:
Your algorithm should have a linear runtime complexity. Try to implement it without using extra memory?
Example 1:
Input: [2,2,1]
Output: 1
Example 2:
Input: [4,1,2,1,2]
Output: 4

**************************/

let myArr = [4,1,2,1,2,3,3]; // output 4

methode1 = () => {
    // for(let i=0; i<myArr.length; i++) {
    //     if(myArr[(i+1)]) {
    //         if(myArr[i] !== myArr[(i+1)]) {
    //             console.log(myArr[i]);
    //         }
    //     }  
    // }
    let un = myArr.filter( (element, i, arr) => arr.indexOf(element, i+1) === -1);
    console.log(un);
    // console.log(myArr.indexOf(3));
    // myArr.reduce( (a, i, j) => {
    //     if(i!==j){return i};
    // })
}

methode1();