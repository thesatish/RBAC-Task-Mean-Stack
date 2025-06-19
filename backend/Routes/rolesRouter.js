const express = require("express");
const app = express.Router();
const rolesController = require('../Controllers/rolesController');
const { checkPermission } = require("../Middleware/permission");

app.post('/', checkPermission('create'), rolesController.createRole);
app.get('/', checkPermission('read'), rolesController.fetchAllRoles);
app.patch('/',checkPermission('edit'),  rolesController.updateRole);
app.patch('/delete',checkPermission('delete'),  rolesController.deleteRole);
app.patch('/delete/multiple', checkPermission('delete'), rolesController.deleteMultipleRoles);


module.exports = app;