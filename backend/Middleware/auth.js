require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send({ status: false, msg: "No Token Provided" });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send({ status: false, msg: "Token is not valid" });
        req.userId = user._id;
        next();
    });
};

module.exports = authenticateToken;