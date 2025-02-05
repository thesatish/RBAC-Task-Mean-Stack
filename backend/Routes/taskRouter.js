const express = require("express");
const app = express.Router();
const taskController = require('../Controllers/taskController');


app.post('/', taskController.createTask);
// app.patch('/', taskController.updateTask);
// app.patch('/delete', taskController.deleteTask);

// app.get('/', taskController.getAllTaskList);
// app.get('/list', taskController.getTaskBetweenDatesAndStatus);

app.get('/all', taskController.fetchTaskGlobal);


module.exports = app;