const handleAsync = require('./utilities/handleAsync.js');
const { rolesAndPermissionSchema } = require('./utilities/validation.js');
const AppError = require('./utilities/errors.js');
const { STATUS } = require('./utilities/constant.js');
const { create, getAll, updateOne, deleteOne } = require('../Services/rolesAndPermissionService.js');

const createRoleAndPermission = handleAsync(async (req, res) => {
    const { error } = rolesAndPermissionSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, STATUS.BAD_REQUEST);
    const response = await create(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const fetchRoleAndPermission = handleAsync(async (req, res) => {
    const response = await getAll(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const updateRoleAndPermission = handleAsync(async (req, res) => {
    const response = await updateOne(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const deleteRoleAndPermission= handleAsync(async (req, res) => {
    const response = await deleteOne(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

module.exports = {
    createRoleAndPermission,
    fetchRoleAndPermission,
    updateRoleAndPermission,
    deleteRoleAndPermission,
}
