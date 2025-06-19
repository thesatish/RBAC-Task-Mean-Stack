const express = require("express");
const app = express.Router();
const taskController = require('../Controllers/taskController');
const { checkPermission } = require("../Middleware/permission");

app.post('/', checkPermission("create"), taskController.createTask);
app.patch('/', checkPermission("edit"), taskController.updateTask);
app.patch('/delete', checkPermission("delete"), taskController.deleteTask);
app.patch('/delete/multiple', checkPermission("delete"), taskController.deleteMultipleTask);
app.get('/', checkPermission("read"), taskController.fetchAllTask);
app.get('/search', checkPermission("read"), taskController.fetchAllTaskSuggestion);
app.get('/all', checkPermission("read"), taskController.fetchTaskGlobal);


module.exports = app;