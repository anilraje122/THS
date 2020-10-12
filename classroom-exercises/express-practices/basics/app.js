const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.end('This is /');
})

app.get('/users', (req, res) => {
    console.log(`Request Method : ${req.method}`);
    console.log(`Query string object : `);
    console.log(req.query);
    console.log(`Path : ${req.path}`);
    res.end('This is /users');
})

app.get('/tokens/:id', (req, res) => {
    console.log(req.params);
    res.end('This is /tokens')
})





app.listen(port, ()=> {
    console.log(`Server Listening on ${port}`);
})