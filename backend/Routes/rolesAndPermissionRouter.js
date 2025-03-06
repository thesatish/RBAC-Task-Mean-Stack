const express = require("express");
const app = express.Router();
const moduleController = require('../Controllers/rolesAndPermissionController');

app.post('/', moduleController.createRoleAndPermission);
app.get('/', moduleController.fetchRoleAndPermission);
app.patch('/', moduleController.updateRoleAndPermission);
app.patch('/delete', moduleController.deleteRoleAndPermission);

module.exports = app;