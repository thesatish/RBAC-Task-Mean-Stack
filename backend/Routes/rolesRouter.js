const express = require("express");
const app = express.Router();
const rolesController = require('../Controllers/rolesController');


app.post('/', rolesController.createRole);
app.get('/', rolesController.fetchAllRoles);
app.patch('/', rolesController.updateRole);
app.patch('/delete', rolesController.deleteRole);
app.patch('/delete/multiple', rolesController.deleteMultipleRoles);


module.exports = app;