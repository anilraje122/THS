// import required modules
const http = require('http');
const stringDecoder = require('string_decoder').StringDecoder;
const url = require('url');

// Declare global variables
const port = process.env.PORT || 8081;

// Create a HTTP server
const server = http.createServer((req, res) => {
    
    // Get URL object and parse it
    const parsedUrl = url.parse(req.url, true);
    
    // Get URL path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Split the path and form input array
    const inputArr = trimmedPath.split('/');

    // Add all numbers in array and pass it to the response
    let sum = inputArr.reduce((a,b) => Number(a) + Number(b) );
    res.end(sum.toString());
});

// Listen to the port specified
server.listen(port, ()=> {
    console.log(`Server started at ${port}`);
})


