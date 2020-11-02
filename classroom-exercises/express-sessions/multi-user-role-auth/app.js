const express = require('express');
const connectDB = require('./connect-db');

const app = express();
const port = process.env.PORT || 3000;

/* Import middlewares */
app.use(express.json());

/* Import routes */
const customerRouter = require('./routes/customer');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');

/* Connect DB */
connectDB();

/* Add routers */
app.use('/api/customer', customerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Server started on ${port}`));


