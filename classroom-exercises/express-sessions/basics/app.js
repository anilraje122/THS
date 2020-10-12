const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send('this is /');
// })

// app.get('/home', (req, res) => {
//     res.json({status: "Success. You are at /home (GET)"});
// })

// app.post('/users', (req, res) => {
//     res.json({status: "Success, you are at /users (POST)"})
// })

// app.put('/users', (req, res) => {
//     res.json({status: "Success, you are at /users (PUT)"})
// })

// app.delete('/users', (req, res) => {
//     res.json({status: "Success, you are at /users (DELETE)"})
// })

/* 
client/request data : 
1. router params
2. query params
3. 
4. 
5. 
*/

app.get('/users/:userid', (req, res) => {
    // router params
    console.log(req.params); // Request format : localhost:3000/users/122
    console.log(req.params.userid);
    
    // query params
    console.log(req.query); // Request format : localhost:3000/users/122?isActive=true
    
    // end request
    res.end();
})

app.listen(port, ()=> {
    console.log(`Server listening on ${port}`);
})
