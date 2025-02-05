const express = require("express");
const app = express.Router();
const userController = require('../Controllers/userController');
const rateLimitter = require('../Middleware/rateLimitter')

app.post('/register', rateLimitter.registerLimitter, userController.userRegister);
app.post('/login', rateLimitter.loginRateLimitter, userController.userLogin);

module.exports = app;