const express = require("express");
const app = express.Router();
const roleAndPrmissionController = require('../Controllers/rolesAndPermissionController');
const { checkPermission } = require("../Middleware/permission");

app.get('/getById/:id', checkPermission('read'), roleAndPrmissionController.fetchRoleAndPermissionById);
app.patch('/edit/:moduleId', checkPermission('edit'), roleAndPrmissionController.updateRoleAndPermission);

module.exports = app;