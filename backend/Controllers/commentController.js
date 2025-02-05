const handleAsync = require('./utilities/handleAsync.js');
const { commentSchema } = require('./utilities/validation.js');
const AppError = require('./utilities/errors.js');
const { STATUS } = require('./utilities/constant.js');
const { create, getAllGlobal } = require('../Services/commentService.js')


const createComment = handleAsync(async (req, res) => {
    const { error } = commentSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, STATUS.BAD_REQUEST);
    const response = await create(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const fetchAllComment = handleAsync(async (req, res) => {
    const response = await getAllGlobal();
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

module.exports = {
    createComment,
    fetchAllComment
}
