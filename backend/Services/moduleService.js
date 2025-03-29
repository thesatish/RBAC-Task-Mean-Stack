const ModuleModel = require('../Models/moduleModel');

const create = async (req) => {
    const result = await ModuleModel.create(req.body)
    return { result, message: "Module Created Successfully" };
}

const getAll = async (req) => {
    const getAllTask = await ModuleModel.find({ isDeleted: false }).lean();
    return { result : getAllTask, message: "Module Fetched Successfully" };
}

const updateOne = async (req) => {
    const result = await ModuleModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: req.body }, { new: true });
    return { result, message: "Module Updated Successfully" };
}

const deleteOne = async (req) => {
    const result = await ModuleModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: { isDeleted: true } }, { new: true });
    return { result, message: "Module Deleted Successfully" };
}

const deleteMultiple = async (req) => {
    let ids = req.body;
    const result = await ModuleModel.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: true } });
    return { result, message: "All Module Have Been Deleted Successfully" };
}

module.exports = {
    create,
    getAll,
    updateOne,
    deleteOne,
    deleteMultiple
}
