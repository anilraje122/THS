// import required modules
const http = require('http');
const stringDecoder = require('string_decoder').StringDecoder;
const url = require('url');

// Declare global variables
const port = process.env.PORT || 8080;

// Create a HTTP server
const server = http.createServer((req, res) => {
    
    // Get URL object and parse it
    const parsedUrl = url.parse(req.url, true);
    
    // Get URL path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    console.log(trimmedPath);

    // Get HTTP method
    const method = req.method.toLowerCase();
    console.log(method);

    // Get query params
    const queryStringObject = parsedUrl.query;
    console.log(queryStringObject);

    // Get request headers
    const headers = req.headers;
    console.log(headers);

    // Get the body
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        console.log(buffer);
        res.end('Hello There!');
    })
   
});

// Listen to the port specified
server.listen(port, ()=> {
    console.log(`Server started at ${port}`);
})


