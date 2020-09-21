/*
    Title       : This is an entry file to handle all the API's
    Author      : Anil Raj
    Description : Implement RESful APIs 
*/

const http = require('http');
const port = process.env.PORT || 3000;

// req - request & res - response
const server = http.createServer((req, res) => { 
    res.end('Hello There!');
});

server.listen(port, () => {
    console.log(`Server started at ${port}`);
});