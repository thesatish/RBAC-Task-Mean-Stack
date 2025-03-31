const handleAsync = require('./utilities/handleAsync.js');
const { roleSchema } = require('./utilities/validation.js');
const AppError = require('./utilities/errors.js');
const { STATUS } = require('./utilities/constant.js');
const { create, getAll, updateOne, deleteOne, deleteMultiple } = require('../Services/rolesService.js');

const createRole = handleAsync(async (req, res) => {
    const { error } = roleSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, STATUS.BAD_REQUEST);
    const response = await create(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const fetchAllRoles = handleAsync(async (req, res) => {
    const response = await getAll(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, data: response };
});

const updateRole = handleAsync(async (req, res) => {
    // const { error } = moduleSchema.validate(req.body);
    // if (error) throw new AppError(error.details[0].message, STATUS.BAD_REQUEST);
    const response = await updateOne(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const deleteRole = handleAsync(async (req, res) => {
    const response = await deleteOne(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const deleteMultipleRoles = handleAsync(async (req, res) => {
    const response = await deleteMultiple(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});


module.exports = {
    createRole,
    fetchAllRoles,
    updateRole,
    deleteRole,
    deleteMultipleRoles
}
