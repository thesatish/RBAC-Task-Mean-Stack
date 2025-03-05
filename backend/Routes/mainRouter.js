const express = require("express");
const app = express.Router();

const task = require("./taskRouter");
const comment = require("./commentRouter");
const module = require("./moduleRouter");

app.use("/task", task);
app.use("/comment", comment);
app.use("/module", module);


module.exports = app;
