const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');
const { encryptedPassword, generateToken } = require('../Controllers/utilities/helper');
const AppError = require("../Controllers/utilities/errors");
const { STATUS } = require('../Controllers/utilities/constant');


const login = async (req) => {
    var { emailId, password } = req.body
    const userData = await User.findOne({ emailId: emailId }).populate("role");
    if (userData) {
        const truePassword = await bcryptjs.compare(password, userData.password);
        if (truePassword) {

            const tokenData = await generateToken(userData);
            const userResult = {
                _id: userData._id,
                fullName: userData.fullName,
                userName: userData.userName,
                emailId: userData.emailId,
                role: userData.role.code,
                token: tokenData
            }

            return { userResult, message: "User Login Success" };

        }
        else {
            throw new AppError("Wrong Credential", STATUS.BAD_REQUEST);

        }
    }
    else {
        throw new AppError("Wrong Credential", STATUS.BAD_REQUEST);
    }
}

const register = async (req) => {
    req.body.password = await encryptedPassword(req.body.password);
    const userResult = await User.findOne({ emailId: req.body.emailId });
    if (userResult) {
        throw new AppError("Email Already Exists", STATUS.BAD_REQUEST);
    }
    else {
        const userInsert = await User.create(req.body);
        const tokenData = await generateToken(userInsert);
        userInsert.token = tokenData;
        return { userInsert, message: "User Registered Success" };
    }
}

module.exports = {
    login,
    register
}
