/* Imports */
const express = require('express');

/* Global vars */
const app = express();
const port = process.env.PORT || 3000;

/* Get method */
app.get('/', (req, res) => {
    res.send('hello world!');
    console.log('request hit on server');
})

/* HTTP server listening on port specified */
app.listen(port, () => console.log(`Server lisening on ${port}`));