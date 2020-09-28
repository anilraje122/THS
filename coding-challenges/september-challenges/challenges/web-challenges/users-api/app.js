// Imports
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const helpers = require('./lib/helpers');
const config = require('./config');
const handlers = require('./lib/handlers');

// Create HTTP Server
const httpServer = http.createServer((req, res) => {
    // Get data from the request
    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headers = req.headers;

    // Get the payload(body) from the request
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data)
    })
    req.on('end', () => {
        buffer += decoder.end();

        // Construct the data object
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: helpers.parseJsonToObject(buffer)
        }

        // Choose the handler where request go according to the route path
        const chosenHandler = typeof (router[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Route the request to the handler that we chosen
        chosenHandler (data, (statusCode, payload) => {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            if(statusCode != 404) {
                payload = typeof (payload) == 'object' ? payload : {};
                payloadString = JSON.stringify(payload);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                res.end(payloadString);   
            } else {
                // 404 error handled
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(statusCode);
                res.write(payload.Error);
                res.end();   
            }
        });
    });
});

httpServer.listen(config.httpPort, () => {
    console.log(`Server listening on ${config.httpPort}`);
});

// Implementing Router
const router = {
    'ping': handlers.ping,
    'users': handlers.users
}



