// HTTP Module

const http = require('http');
const port = process.env.PORT || 3000;

// Create HTTP server
const httpServer = http.createServer((req, res) => {
    const path = req.url;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    console.log(trimmedPath);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hellow World');
    res.end('\n');
});

// HTTP server listening on port 3000
httpServer.listen(port, () => {
    console.log(`Server Started on ${port}`);
});

