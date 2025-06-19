const express = require("express");
const app = express.Router();

const task = require("./taskRouter");
const comment = require("./commentRouter");
const modules = require("./moduleRouter");
const role = require("./rolesRouter");
const roleAndPermission = require("./rolesAndPermissionRouter");
const auth = require("./authRouther");

app.use("/task", task);
app.use("/comment", comment);
app.use("/module", modules);
app.use("/role", role);
app.use("/roleAndPermission", roleAndPermission);
app.use("/auth", auth);


module.exports = app;
