const express = require("express");
const app = express.Router();
const moduleController = require('../Controllers/moduleController');
const { checkPermission } = require("../Middleware/permission");


app.post('/', checkPermission("create"), moduleController.createModule);
app.get('/', checkPermission("read"), moduleController.fetchAllModule);
app.patch('/', checkPermission("edit"), moduleController.updateModule);
app.patch('/delete', checkPermission("delete"), moduleController.deleteModule);
app.patch('/delete/multiple', checkPermission("delete"), moduleController.deleteMultipleModule);


module.exports = app;