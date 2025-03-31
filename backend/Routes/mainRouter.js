const express = require("express");
const app = express.Router();

const task = require("./taskRouter");
const comment = require("./commentRouter");
const modules = require("./moduleRouter");
const role = require("./rolesRouter");

app.use("/task", task);
app.use("/comment", comment);
app.use("/module", modules);
app.use("/role", role);


module.exports = app;
