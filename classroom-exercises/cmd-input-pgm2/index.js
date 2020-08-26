
// accessing command line arguments
var args = process.argv;

args.forEach(element => {
    console.log(element);
});

for(var i=0; i<args.length; i++) {
    console.log(args[i]);
}


// exporting variables for main.js
var fname = "Anil";
var lname = "Raj";
var age = 29;
module.exports = {
    fname, 
    lname, 
    age : 40, // you can override the old value here. Eg: 29
    gender : "male" //you also add a new key/value to the exporting object
};
