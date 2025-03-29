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

const getAllWithPagination = async (req) => {
    let { page = 1, limit = 100, isDeleted } = req.query
    const currentPage = parseInt(page);
    const limitParsed = parseInt(limit);

    let filter = {
        userId: req.userId,
        isDeleted: false
    }

    let recordsTotal = await TaskModel.countDocuments(filter);
    const getAllTask = await TaskModel.find(filter).skip(currentPage).limit(limitParsed).lean();
    return {
        total_pages: Math.ceil(recordsTotal / limit),
        total_count: recordsTotal,
        current_page: page,
        per_page: limit,
        result: getAllTask,
        message: "Task Fetched Successfully"
    };
}

const updateOne = async (req) => {
    const result = await TaskModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: req.body }, { new: true });
    return { result, message: "Task Updated Successfully" };
}

const deleteOne = async (req) => {
    const result = await TaskModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: { isDeleted: true } }, { new: true });
    return { result, message: "Task Deleted Successfully" };
}

const deleteMultiple = async (req) => {
    let ids = req.body;
    const result = await TaskModel.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: true } });
    return { result, message: "All Task Have Been Deleted Successfully" };
}

const bulkUpdate = async (req) => {
    const updates = req.body;
    if (!updates || updates.length === 0) {
        return res.status(400).json({ success: false, message: 'No updates provided' });
    }
    const bulkOps = updates.map(task => ({
        updateOne: {
            filter: { _id: task._id },
            update: { $set: task }
        }
    }));
    const result = await Task.bulkWrite(bulkOps);
    return { result, message: "All Task Have Been Update Successfully" };
}

const deleteAll = async (req) => {
    const result = await TaskModel.updateMany({ userId: req.userId }, { $set: { isDeleted: true } });
    return { result, message: "All Task Have Been Deleted Successfully" };
}

const getAllGlobal = async () => {
    const getAllTask = await TaskModel.find({ isDeleted: false })
        .populate("createdBy", "-password -token")
        .populate({
            path: "comments",
            select: "-createdAt -updatedAt",
            populate: {
                path: "commentedBy",
                select: "userName"
            }
        }).lean();
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
    getAllGlobal,
    bulkUpdate,
    getAllWithPagination
}
