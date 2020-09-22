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

    // Get the path
    const path = parsedUrl.pathname;
    console.log(`Parsed URL path : ${path}`);
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Get query params Object
    const queryStringObject = parsedUrl.query;

    // Get headers Object
    const headers = req.headers;

    // Get the body
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        // Choose handler as per the request path
        const choosenHandeler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct data to send to the choosen handler
        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        }

        // Route request to the handler that we choosed
        choosenHandeler(data, (statusCode, payload) => {
            // Use statusCode called back by the handler or 200
            statusCode = (typeof statusCode === 'number') ? statusCode : 200;

            // Use payload called back by the handler or default to an empty object
            payload = (typeof payload === 'object') ? payload : {};

             // Convert payload to String
            const payloadString = JSON.stringify(payload);

            // clg buffer/body
            console.log(trimmedPath, method, queryStringObject, headers);
            console.log(`Body ${buffer}`);

            // Final response
            res.setHeader('Content-Type', 'Application/JSON');
            res.writeHead(statusCode);
            res.end(payloadString);

            // clg statuscode and payload
            console.log(statusCode, payloadString);
        });
    });
});

// Listen on port defined
server.listen(port, () => {
    console.log(`Server started at ${port}`);
});

// Implementing routing handlers
const handlers = {}; 

handlers.sample = (data, callback) => {
    // callback returns a http status code and a payload object
    callback(200, {'status': 'You just accessed /sample'});
}

handlers.notFound = (data, callback) => {
    callback(404, {'status': 'Page Not Found'});
}

// Implementing Router
const router = {
    'sample' : handlers.sample,
    'notFound' : handlers.notFound
}