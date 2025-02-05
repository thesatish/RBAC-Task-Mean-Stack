const CommentModel = require('../Models/commentModel');

const create = async (req) => {
    req.body["task"] = req.params.taskId;
    req.body["commentedBy"] = req.userId;
    const result = await CommentModel.create(req.body)
    return { result, message: "Comment Created Successfully" };
}

const getAllGlobal = async () => {
    const getAllTask = await CommentModel.find().lean();
    const result = getAllTask.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('en-GB'),
        updatedAt: new Date(item.updatedAt).toLocaleDateString('en-GB')
    }));
    return { result, message: "All Comment Fetched Successfully" };
}

module.exports = {
    create,
    getAllGlobal,
}
