const handleAsync = require('./utilities/handleAsync.js');
const { taskSchema } = require('./utilities/validation.js');
const AppError = require('./utilities/errors.js');
const { STATUS } = require('./utilities/constant.js');
const { create, getAllGlobal } = require('../Services/taskService.js');

const createTask = handleAsync(async (req, res) => {
    const { error } = taskSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, STATUS.BAD_REQUEST);
    const response = await create(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const fetchTaskGlobal = handleAsync(async (req, res) => {
    const response = await getAllGlobal();
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});



module.exports = {
    createTask,
    fetchTaskGlobal
}
