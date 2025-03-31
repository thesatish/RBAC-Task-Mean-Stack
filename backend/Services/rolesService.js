const RolesModel = require('../Models/rolesModel');
const AppError = require('../Controllers/utilities/errors.js');
const { STATUS } = require('../Controllers/utilities/constant.js');

const create = async (req) => {
    const existRole = await RolesModel.findOne({ name: req.body.name }).lean();
    if (existRole) throw new AppError("Role Already Exists", STATUS.BAD_REQUEST);

    result = await RolesModel.create(req.body)
    return { result, message: "Role Created Successfully" };
}

const getAll = async (req) => {
    const getAllTask = await RolesModel.find({ isDeleted: false }).lean();
    return { result: getAllTask, message: "Roles Fetched Successfully" };
}

const updateOne = async (req) => {
    const existRole = await RolesModel.exists({
        name: req.body.name,
        _id: { $ne: req.body._id }
    });

    if (existRole) throw new AppError("Role Name Already Exists", STATUS.BAD_REQUEST);


    const result = await RolesModel.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { new: true }
    );

    return { result, message: "Role Updated Successfully" };
};

const deleteOne = async (req) => {
    const result = await RolesModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: { isDeleted: true } }, { new: true });
    return { result, message: "Role Deleted Successfully" };
}

const deleteMultiple = async (req) => {
    let ids = req.body;
    const result = await ModuleModel.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: true } });
    return { result, message: "All Roles Have Been Deleted Successfully" };
}

module.exports = {
    create,
    getAll,
    updateOne,
    deleteOne,
    deleteMultiple
}
