const TaskModel = require('../Models/taskModel');

const create = async (req) => {
    req.body["userId"] = req.userId;
    req.body["createdBy"] = req.userId;
    const result = await TaskModel.create(req.body)
    return { result, message: "Task Created Successfully" };
}

const getAll = async (req) => {
    const getAllTask = await TaskModel.find({ userId: req.userId, isDeleted: false }).lean();
    const result = getAllTask.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('en-GB'),
        updatedAt: new Date(item.updatedAt).toLocaleDateString('en-GB')
    }));
    return { result, message: "Task Fetched Successfully" };
}

const updateOne = async (req) => {
    const result = await TaskModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: req.body }, { new: true });
    return { result, message: "Task Updated Successfully" };
}

const deleteOne = async (req) => {
    const result = await TaskModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: { isDeleted: true } }, { new: true });
    return { result, message: "Task Fetch Successfully" };
}

const deleteMultiple = async (req) => {
    let ids = req.ids;
    const result = await TaskModel.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: true } });
    return { result, message: "All Task Deleted Successfully" };
}

const deleteAll = async (req) => {
    const result = await TaskModel.updateMany({ userId: req.userId }, { $set: { isDeleted: true } });
    return { result, message: "All Task Deleted Successfully" };
}

const getAllGlobal = async () => {
    const getAllTask = await TaskModel.find()
    .populate("createdBy", "-password -token")
    .populate({
      path: "comments",
      select: "-createdAt -updatedAt",
    })
    .lean();
    const result = getAllTask.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('en-GB'),
        updatedAt: new Date(item.updatedAt).toLocaleDateString('en-GB')
    }));

    return { result, message: "Global Task Fetched Successfully" };
}


module.exports = {
    create,
    getAll,
    updateOne,
    deleteOne,
    deleteMultiple,
    deleteAll,
    getAllGlobal
}
