require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send({ status: false, message: "Unauthorized" });  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      req.userId = decoded.userId;
      next();

    } catch (error) {
      res.status(400).send({ message: "Invalid Token" });
    }
  };

module.exports = authenticateToken;