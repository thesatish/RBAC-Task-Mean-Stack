const handleAsync = require('./utilities/handleAsync.js');
const AppError = require('./utilities/errors.js');
const { STATUS } = require('./utilities/constant.js');
const { getAllWithPagination, updateOne, deleteOne } = require('../Services/authService.js');


const fetchAllUsers = handleAsync(async (req, res) => {
    const response = await getAllWithPagination(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, data : response};
});

const updatUser = handleAsync(async (req, res) => {
    const response = await updateOne(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const deleteUser = handleAsync(async (req, res) => {
    const response = await deleteOne(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});


module.exports = {
    fetchAllUsers,
    updatUser,
    deleteUser
}
