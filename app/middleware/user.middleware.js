const jwt = require('jsonwebtoken');
require("dotenv").config();
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.json({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: error });
    }
};

module.exports = verifyToken;