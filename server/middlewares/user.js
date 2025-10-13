require("dotenv").config();
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const token = req.headers.auth;
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);

    if(decoded) {
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({ message: "You are not signed in", success: false})
    }
}

module.exports = {
    userMiddleware
};