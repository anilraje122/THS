/*
    Title       : This is an entry file to handle all the API's
    Author      : Anil Raj
    Description : Implement RESful APIs 
*/

// Import modules
const http = require('http');
const https = require('https');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
// const _data = require('./lib/data');
const handlers = require('./lib/router-handlers');
const helpers = require('./lib/helpers');
const port = process.env.PORT || 3000;

// file ops - create new file and add content
// _data.create('test', 'newFile', {"Bootcamp": "THS"}, (err) => {
//     if(err) throw err;
// });

// file ops - read existing file
// _data.read('test', 'newFile', (err, data) => {
//     if(!err) {
//         console.log('File content is : '+ data);
//     } else {
//         console.log('Error: Unable to read file!\n'+ err);
//     }
// });

// file ops - update existing file
// _data.update('test', 'newFile', {"Bootcamp3": "THS3"}, (err) => {
//     if(err) throw err;
// });

// file ops - delete file
// _data.delete('test', 'newFile', (err) => {
//     if(err) throw err;
// });




// Global declaration

// HTTP server
const httpServer = http.createServer((req, res) => {  // req - request & res - response
    unifiedServer(req, res);
});

// HTTP listen
httpServer.listen(port, () => {
    console.log(`HTTP Server started at ${port} in Heroku Mode`);
});

// // HTTPS server
// const httpsServerOptions = {
//     'key': fs.readFileSync('./https/key.pem'),
//     'cert': fs.readFileSync('./https/cert.pem')
// };
// const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
//     unifiedServer(req, res);
// });

// // HTTPS listen
// httpsServer.listen(config.httpsPort, () => {
//     console.log(`HTTPS Server started at ${port} in in Heroku Mode`);
// });


// Implementing Router
const router = {
    'ping' : handlers.ping,
    'users' : handlers.users,
    'notFound' : handlers.notFound
}

// Handle both HTTP and HTTPS
const unifiedServer = (req, res) => {
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
        const choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct data to send to the choosen handler
        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : helpers.parseJsonToObject(buffer)
        }

        // Route request to the handler that we choosed
        choosenHandler(data, (statusCode, payload) => {
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
}