const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
var cors = require("cors");

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Route Imports
const user = require("./routes/userRoute");
const tweet = require("./routes/tweetRoute");

app.use("/api", user);
app.use("/api/tweet", tweet);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
