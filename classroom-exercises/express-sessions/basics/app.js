const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// App middleware
app.use(bodyParser.json());

/* 
client/request data : 
1. router params
2. query params
3. req headers
4. body object
5. 
*/

app.get('/', (req, res) => {
    res.send('this is /');
})

app.get('/users/:userid', (req, res) => {
    // router params
    console.log(req.params); // Request format : localhost:3000/users/122
    console.log(req.params.userid);
    
    // query params
    console.log(req.query); // Request format : localhost:3000/users/122?isActive=true
    
    // req headers
    console.log(req.headers);

    // req body
    console.log(req.body);

    // path
    console.log(req.originalUrl);

    // end request
    res.end();
})

// Nested call backs
app.get('/home', (req, res, next) => {
    console.log(req.query);
    console.log('Im hit 1');
    req.some_value = 10;
    next();
}, (req, res, next) => {
    console.log('Im hit 2');
    console.log(req.some_value);
    next();
}, (req, res) => {
    console.log('Im hit 3');
    console.log('Hit ends here..');
    res.send('Check console for query data');
})


// Seperate call backs
const cb1 = (req, res, next) => {
    console.log(req.query);
    console.log('Im hit 1');
    next();
}

const cb2 = (req, res, next) => {
    console.log(req.query);
    console.log('Im hit 2');
    req.some_value = 10;
    next();
}

const cb3 = (req, res) => {
    console.log(req.query);
    console.log('Im hit 3');
    console.log(req.some_value);
    res.send('Check console for query data');
}

app.get('/users', cb1, cb2, cb3);


// Listen
app.listen(port, ()=> {
    console.log(`Server listening on ${port}`);
})
