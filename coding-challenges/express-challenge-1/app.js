/* Imports */
const fs = require('fs');
const http = require('http');
const https = require('https');
const data = require('./store/data');
const express = require('express');
const serveIndex = require('serve-index');
const forceSSL = require('express-force-ssl');

/* Global vars */
const app = express();
const httpPort = process.env.HTTP_PORT || 80;
const httpsPort = process.env.HTTPS_PORT || 443;

/* Read SSL cert and key */
let key = fs.readFileSync('.ssl/private.key');
let cert = fs.readFileSync('.ssl/certificate.crt');
let ca = fs.readFileSync('.ssl/ca_bundle.crt');
const options = { key, cert, ca }

/* Create HTTP and HTTPS servers */
const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);

/* Redirect HTTP to HTTPS */
// app.use(forceSSL);
app.use('*', (req, res, next) => {
    if(!req.secure) {
        res.redirect('https://'+ req.hostname + ':' + httpsPort + req.url);
    } else {
        next();
    }
});

/* Server static files under public folder */
app.use('/.well-known/pki-validation/', serveIndex('public/.well-known/pki-validation/'), express.static('public/.well-known/pki-validation/'));

/* Log IP for every request */
app.use('/', async (req, res, next) => {
    try {
        const curTimestamp = Date.now();
        const logData = `Server was accessed by ${req.ip} at ${new Date().toLocaleString()}`;
        const recentFile = data.getMostRecentFile('logs');
        // Update recent file if exist as per below condition
        if(recentFile) {
            const recentFileSize = await data.readStats('logs', recentFile);
            if(recentFileSize >= 2000) {
                await data.write('logs', curTimestamp, logData);
                next();
            } else {
                await data.update('logs', recentFile, logData);
                next();
            } 
        } else {
            await data.write('logs', curTimestamp, logData);
            next();
        }  
    } catch(err){
        next();
    }     
})

/* Get method */
app.get('/', (req, res) => {
    res.send('hello world!');
})

/* servers listening on port specified */
httpServer.listen(httpPort, () => console.log(`HTTP Server listening on ${httpPort}`));
httpsServer.listen(httpsPort, () => console.log(`HTTPS Server listening on ${httpsPort}`));