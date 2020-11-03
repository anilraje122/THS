const express = require("express");
const connectDB = require("./connect-db");

const app = express();
const port = process.env.PORT || 3000;

/* Import routers */
const customerRouter = require("./routes/customer");
const customerProfileRouter = require("./routes/customer/profile");

const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");

/* Connect to database */
connectDB();

/* Add middlwares */
app.use(express.json());

/* Add routers */
app.use("/api/customer", customerRouter);
app.use("/api/customer/profile", customerProfileRouter);

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

/* App listening on specified port */
app.listen(port, () => console.log(`App listening on ${port}`));
