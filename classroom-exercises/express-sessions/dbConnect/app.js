/* Imports */
const express = require('express');
const connectDB = require('./dbConnect');
const Users = require('./models/users');

/* Global vars */
const app = express();
const port = process.env.PORT || 3000;

/* Connect to local db*/
connectDB();

/* Add body parser */
app.use(express.json());

/* POST */
app.post('/', (req, res)=> {
    const user = Users(req.body);
    user.save((err) => {
        if(err) {
            res.send('Input validation failed!');
        }
        res.status(200).json({"status": "Data stored successfully in DB"})
    })
})

/* App listen */
app.listen(port, console.log(`Server listening on ${port}`));