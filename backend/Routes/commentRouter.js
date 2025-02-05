const express = require("express");
const app = express.Router();
const commentController = require('../Controllers/commentController');


app.post('/', commentController.createComment);

app.get('/all', commentController.fetchAllComment);


module.exports = app;