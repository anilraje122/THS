const express = require("express");
const connectDB = require("./ConnectDB");
const userRouter = require("./Routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
connectDB();

// Add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);

// Listen to specific port
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
