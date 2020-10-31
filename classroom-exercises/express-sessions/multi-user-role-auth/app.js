const express = require('express');
const connectDB = require('./connect-db');

const app = express();
const port = process.env.PORT || 3000;

/* Import middlewares */
app.use(express.json());

/* Import routes */
const customerRouter = require('./routes/customer');

/* Connect DB */
connectDB();

/* Add routers */
app.use('/api/customer', customerRouter);

app.listen(port, () => console.log(`Server started on ${port}`));


