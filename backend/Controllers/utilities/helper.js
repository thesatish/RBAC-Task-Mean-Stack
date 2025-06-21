const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const encryptedPassword = async (password) => {
    try {
        const hashPass = await bcryptjs.hash(password, 10);
        return hashPass;

    } catch (error) {
        console.log("error...", error);
    }
}

const generateToken = async (userData) => {
    try {
        const token = await jwt.sign(
            { userId: userData._id, role: userData.role._id },
            process.env.SECRET_KEY);

        return token;
    } catch (error) {
        console.log("error...", error);

    }
}


module.exports = {
    encryptedPassword,
    generateToken
}