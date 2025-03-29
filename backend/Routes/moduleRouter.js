const express = require("express");
const app = express.Router();
const moduleController = require('../Controllers/moduleController');


app.post('/', moduleController.createModule);
app.get('/', moduleController.fetchAllModule);
app.patch('/', moduleController.updateModule);
app.patch('/delete', moduleController.deleteModule);
app.patch('/delete/multiple', moduleController.deleteMultipleModule);


module.exports = app;