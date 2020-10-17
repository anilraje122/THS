/* Imports */
const express = require('express');
const fs = require('fs');
const _data = require('./store/data');
const serveIndex = require('serve-index');
const https = require('https');

/* Global vars */
const app = express();
const port = process.env.PORT || 3000;
const baseDir = 'logs';
let key = fs.readFileSync('.ssl/private.key');
let cert = fs.readFileSync('.ssl/certificate.crt');
let ca = fs.readFileSync('.ssl/ca_bundle.crt');
const server = https.createServer({key: key, cert: cert, ca: ca}, app);

/* Server static files under public folder */
app.use('/.well-known/pki-validation/', serveIndex('public/.well-known/pki-validation/'), express.static('public/.well-known/pki-validation/'));

/* Log IP for every request */
app.use('/', async (req, res, next) => {
    try {
        const curTimestamp = Date.now();
        const logData = `Server was accessed by ${req.ip}`;
        const recentFile = _data.getMostRecentFile('logs');
        // Update recent file if exist as per below condition
        if(recentFile) {
            const recentFileSize = await _data.readStats('logs', recentFile);
            if(recentFileSize >= 2000) {
                await _data.write('logs', curTimestamp, logData);
                next();
            } else {
                await _data.update('logs', recentFile, logData);
                next();
            } 
        } else {
            await _data.write('logs', curTimestamp, logData);
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

/* HTTP server listening on port specified */
server.listen(port, () => console.log(`Server listening on ${port}`));