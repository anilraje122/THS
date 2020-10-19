/* Imports */
const express  = require('express');
const serveIndex = require('serve-index');

/* Global vars */
const app = express();
const port = process.env.PORT || 3000;

/* Home route */
// express.static serve static files. This require index.html file
app.use('/', express.static('views'));


/* Books route */
/* serverIndex provide directory listings */
// app.use('/books', serveIndex('books'));

/* express.static serve static files. This require index.html file */
// app.use('/books', express.static('books'));

/* Merge above mentioned serveIndex and express.static into one method */
app.use('/books', serveIndex('books', {'icons': true}), express.static('books') );

/* Listen */
app.listen(port, () => console.log(`Server listening on ${port}`));