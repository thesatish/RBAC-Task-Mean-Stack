const RolesAndPermissionModel = require('../Models/rolesAndPermissionModel');

const create = async (req) => {
    const result = await RolesAndPermissionModel.create(req.body)
    return { result, message: "Module Created Successfully" };
}

const getAll = async (req) => {
    const getAllTask = await RolesAndPermissionModel.find({ isDeleted: false }).lean();
    const result = getAllTask.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('en-GB'),
        updatedAt: new Date(item.updatedAt).toLocaleDateString('en-GB')
    }));
    return { result, message: "Module Fetched Successfully" };
}

const updateOne = async (req) => {
    const result = await RolesAndPermissionModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: req.body }, { new: true });
    return { result, message: "Module Updated Successfully" };
}

const deleteOne = async (req) => {
    const result = await RolesAndPermissionModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: { isDeleted: true } }, { new: true });
    return { result, message: "Module Deleted Successfully" };
}

module.exports = {
    create,
    getAll,
    updateOne,
    deleteOne,
}
