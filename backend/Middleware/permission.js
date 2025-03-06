const RolesAndPermissionModel = require('../Models/rolesAndPermissionModel');

module.exports.checkPermission = (module, action) => async (req, res, next) => {
    try {
        const userRole = req.user.role;
        const role = await RolesAndPermissionModel.findOne({ name: userRole });
        if (!role) return res.status(403).json({ message: "Role not found" });
        const permission = role.permissions.find((p) => p.module === module);
        if (!permission || !permission.actions[action]) {
            return res.status(403).json({ message: `No ${action} permission for ${module}` });
        }

        next();

    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};
