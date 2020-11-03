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
const customerProfileRouter = require('./routes/customer/profile');

/* Connect DB */
connectDB();

/* Add routers */
app.use('/api/customer', customerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/customer/profile', customerProfileRouter);

app.listen(port, () => console.log(`Server started on ${port}`));


