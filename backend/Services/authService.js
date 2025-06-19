const User = require('../Models/userModel');


const getAllWithPagination = async (req) => {
    let { page = 1, limit = 100, isDeleted, startDate, endDate } = req.query
    const currentPage = parseInt(page);
    const limitParsed = parseInt(limit);

    let filter = {
        isDeleted: false
    }

    if (startDate && endDate) {
        filter.createdAt = {};

        if (startDate) {
            filter.createdAt.$gte = moment(startDate, 'MM/DD/YYYY').toDate();
        }
        if (endDate) {
            filter.createdAt.$lte = moment(endDate, 'MM/DD/YYYY').endOf('day').toDate();
        }
    }
    // else {
    //     filter.updatedAt = { $gte: moment().startOf('day').toDate(), $lte: moment().endOf('day').toDate() }
    // }


    let recordsTotal = await User.countDocuments(filter);
    const getAllUsers = await User.find(filter).populate("role", "-code")
        .skip((currentPage - 1) * limitParsed).limit(limitParsed).lean();
    return {
        total_pages: Math.ceil(recordsTotal / limit),
        total_count: recordsTotal,
        current_page: currentPage,
        per_page: limitParsed,
        result: getAllUsers,
        message: "Task Fetched Successfully"
    };

}

const updateOne = async (req) => {
    const result = await User.findOneAndUpdate(
        { _id: req.body._id }, { $set: req.body }, { new: true });
    return { result, message: "User Updated Successfully" };
}

const deleteOne = async (req) => {
    const result = await User.findOneAndUpdate(
        { _id: req.body._id }, { $set: { isDeleted: true } }, { new: true });
    return { result, message: "User Deleted Successfully" };
}

module.exports = {
    getAllWithPagination,
    updateOne,
    deleteOne
}
