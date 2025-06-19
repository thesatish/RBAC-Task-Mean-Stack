const RolesAndPermissionModel = require('../Models/rolesAndPermissionModel');
const ModuleModel = require('../Models/moduleModel');

module.exports.checkPermission = (action) => async (req, res, next) => {
    try {
        const userRole = req.user.role;
        const module = req.headers['x-module-id'];
        const moduleDetails = await ModuleModel.findOne({ code: module});
        if (!moduleDetails) return res.status(403).send({ message: "Module not found" });

        console.log("moduleDetails::::",moduleDetails)

        const role = await RolesAndPermissionModel.findOne({ role: userRole });
        if (!role) return res.status(403).send({ message: "Role not found" });

        const permission = role.permissions.find((p) => p.module.toString() === moduleDetails._id.toString());
        console.log("prmission:::::::", permission);

        console.log("action::::", action);
        
        if (!permission || !permission.actions[action]) {
            return res.status(403).send({ message: `No ${action} permission for ${module}` });
        }

        next();

    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};
