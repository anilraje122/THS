// Import ext libs
const express = require('express');
const fs = require('fs');

// Import the router modules
const adminRoutes = require('./routes/admin');
const managerRouter = require('./routes/manager');
const userRouter = require('./routes/user');

// Global vars
const app = express();
const port = process.env.PORT || 3000;

// Logging request IP address - Applicable to all routes
app.use((req, res, next) => {
    console.log(req.ip + ' at ' + new Date());
    const logData = req.ip + ' at ' + new Date() + '\n'; // todo: convert logData to an object
    fs.appendFile('logs.txt', logData, (err) => {
        if(err) {
            console.log(err);
            next();
        } else {
            next();
        }
    })
})

// Admin router
app.use('/admin', adminRoutes);
// Manager router
app.use('/manager', managerRouter);
// User router
app.use(userRouter); // same as app.use('/', userRouter)



// Server listen
app.listen(port, () => console.log(`Server listening on ${port}`));

