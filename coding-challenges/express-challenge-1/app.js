/* Imports */
const express = require('express');
const fs = require('fs');
const _data = require('./store/data');
const serveIndex = require('serve-index');


/* Global vars */
const app = express();
const port = process.env.PORT || 3000;
const baseDir = 'logs';

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
app.listen(port, () => console.log(`Server listening on ${port}`));