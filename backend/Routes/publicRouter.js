const express = require("express");
const app = express.Router();
const users = require("./userRouter");
app.use("/user", users);

module.exports = app;
