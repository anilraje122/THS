const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

/* Import routers */
const customerRouter = require('./routes/customer');
const adminRouter = require('./routes/admin');

/* Add middlwares */
app.use(express.json());

/* Add routers */
app.use('/api/customer', customerRouter);
app.use('/api/admin', adminRouter);

/* App listening on specified port */
app.listen(port, () => console.log(`App listening on ${port}`));