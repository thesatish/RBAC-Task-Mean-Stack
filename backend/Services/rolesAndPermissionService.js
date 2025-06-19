const RolesAndPermissionModel = require('../Models/rolesAndPermissionModel');
const { ObjectId } = require('mongodb');
const ModuleModel = require('../Models/moduleModel');

const getById = async (id) => {
    const allModules = await ModuleModel.find({ isDeleted: false });
    const roleId = new ObjectId(id);
    const roleWithPermissions = await RolesAndPermissionModel.findOne({
        isDeleted: false,
        role: roleId,
    }).populate('permissions.module');

    const permissions = roleWithPermissions?.permissions || [];

    const result = allModules.map((mod) => {
        const matchedPermission = permissions.find((perm) =>
            perm.module && perm.module._id.toString() === mod._id.toString()
        );
        
        const actions = matchedPermission?.actions || {
            create: false,
            read: false,
            edit: false,
            delete: false,
        };

        const any = actions.create || actions.read || actions.edit || actions.delete;

        return {
            rolesAndPermissionId: matchedPermission?._id,
            roleId: roleId,
            moduleId: mod._id,
            name: mod.name,
            description: mod.description,
            actions: {
                ...actions,
                any: any
            },
        };
    });

    return { result, message: "Role and Permission Fetched Successfully" };
}

const updateOne = async (id, body) => {
    const { roleId, action, operation } = body;
    const moduleId = id;
    const rolePerm = await RolesAndPermissionModel.findOne({
        isDeleted: false,
        role: new ObjectId(roleId)
    });

    if (!rolePerm) {
        const newDoc = new RolesAndPermissionModel({
            role: roleId,
            permissions: [
                {
                    module: moduleId,
                    actions: {
                        create: false,
                        read: false,
                        edit: false,
                        delete: false,
                        [operation]: action
                    }
                }
            ]
        });

        await newDoc.save();
        return { newDoc, message: "Role and Permission Successfully Updated" };
    }

    const existingPermissionIndex = rolePerm.permissions.findIndex(
        (perm) => perm.module.toString() === moduleId
    );

    if (existingPermissionIndex !== -1) {
        rolePerm.permissions[existingPermissionIndex].actions[operation] = action;

    } else {
        // Add new permission object
        const newPermission = {
            module: new ObjectId(moduleId),
            actions: {
                create: false,
                read: false,
                edit: false,
                delete: false,
                [operation]: action
            }
        };

        rolePerm.permissions.push(newPermission);
    }

    await rolePerm.save();

    return { rolePerm, message: "Role and Permission Successfully Updated" };
}

module.exports = {
    updateOne,
    getById
}
