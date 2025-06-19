const handleAsync = require('./utilities/handleAsync.js');
const { rolesAndPermissionSchema } = require('./utilities/validation.js');
const AppError = require('./utilities/errors.js');
const { STATUS } = require('./utilities/constant.js');
const { updateOne, getById } = require('../Services/rolesAndPermissionService.js');

const fetchRoleAndPermissionById = handleAsync(async (req, res) => {
    const response = await getById(req.params.id);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

const updateRoleAndPermission = handleAsync(async (req, res) => {
    const response = await updateOne(req.params.moduleId, req.body);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});

module.exports = {
    updateRoleAndPermission,
    fetchRoleAndPermissionById
}
