const express = require("express");
const app = express.Router();
const authController = require('../Controllers/authController');
const { checkPermission } = require("../Middleware/permission");

app.get('/',checkPermission("read"), authController.fetchAllUsers);
app.patch('/edit/:id', checkPermission('edit'), authController.updatUser);

module.exports = app