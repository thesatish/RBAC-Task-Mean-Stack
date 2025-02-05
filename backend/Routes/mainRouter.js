const express = require("express");
const app = express.Router();

const task = require("./taskRouter");
const comment = require("./commentRouter");
app.use("/task", task);
app.use("/comment", comment);


module.exports = app;
