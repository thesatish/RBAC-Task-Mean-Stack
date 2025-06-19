const handleAsync = require('./utilities/handleAsync.js');
const { registerSchema, loginSchema } = require('./utilities/validation.js');
const AppError = require('./utilities/errors.js');
const { STATUS } = require('./utilities/constant.js');
const { login, register } = require('../Services/userService.js');

// User Login
const userLogin = handleAsync(async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, STATUS.BAD_REQUEST);
    const response = await login(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.OK, message: response.message, data: response.userResult };
});

// User Register
const userRegister = handleAsync(async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, STATUS.BAD_REQUEST);
    const response = await register(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.OK, message: response.message, data: response.userInsert };
});



module.exports = {
    userRegister,
    userLogin,
}
