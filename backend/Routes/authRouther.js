const express = require("express");
const app = express.Router();
const authController = require('../Controllers/authController');
const { checkPermission } = require("../Middleware/permission");

app.get('/',checkPermission("read"), authController.fetchAllUsers);
app.patch('/', checkPermission('edit'), authController.updatUser);
app.patch('/delete', checkPermission('delete'), authController.deleteUser);


module.exports = app