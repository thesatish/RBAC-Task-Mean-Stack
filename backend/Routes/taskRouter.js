const express = require("express");
const app = express.Router();
const taskController = require('../Controllers/taskController');
const { checkPermission } = require("../Middleware/permission");

app.post('/', checkPermission("task", "create"), taskController.createTask);
app.patch('/', checkPermission("task", "edit"), taskController.updateTask);
app.patch('/delete', checkPermission("task", "delete"), taskController.deleteTask);
app.patch('/delete/multiple', taskController.deleteMultipleTask);
app.get('/', checkPermission("task", "read"), taskController.fetchAllTask);
app.get('/search', checkPermission("task", "read"), taskController.fetchAllTaskSuggestion);

app.get('/all', taskController.fetchTaskGlobal);


module.exports = app;