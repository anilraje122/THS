// Imports
const https = require('https');
const fs = require('fs');

// Global varibles
const port = process.env.PORT || 3000;
const options = {
    key: fs.readFileSync('./ssl-certs/key.pem'),
    cert: fs.readFileSync('./ssl-certs/cert.pem')
}

// Create HTTPS server
var httpsServer = https.createServer(options, (req, res) => {
    res.write('Hello, Welcome to HTTPS server!');
    res.end('\n');
})

httpsServer.listen(port, ()=> {
    console.log('Server started on ' + port);
})
