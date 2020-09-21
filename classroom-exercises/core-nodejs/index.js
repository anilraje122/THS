/*
    Title       : This is an entry file to handle all the API's
    Author      : Anil Raj
    Description : Implement RESful APIs 
*/

// Import modules
const http = require('http');
const { decode } = require('punycode');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

// Global declaration
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {  // req - request & res - response
    // Get the URL Object and parse it
    const parsedUrl = url.parse(req.url, true);
    console.log('The URL object : ');
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    console.log(`Parsed URL path : ${path}`);
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    console.log(`Trimmed path : ${trimmedPath}`);

    // Get the HTTP method
    const method = req.method.toLowerCase();
    console.log(`HTTP method : ${method}`);

    // Get query params Object
    const queryStringObject = parsedUrl.query;
    console.log('Query String Object : '); 
    console.log(queryStringObject);

    // Get headers Object
    const headers = req.headers;
    console.log('Header Object : ');
    console.log(headers);

    // Get the body
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        console.log('Buffer value : ');
        console.log(buffer);
        res.end('Hello There!');
    });
});

server.listen(port, () => {
    console.log(`Server started at ${port}`);
});