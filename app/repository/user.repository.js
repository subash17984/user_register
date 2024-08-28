const db = require("../db/dbconfig");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.user;
exports.findAll = async () => {
    try {
        const response = await User.find().select('-createdAt -updatedAt');;
        return response;
    } catch (error) {
        return error;
    }
};
exports.Create = async (data) => {
    try {
        const user = new User(data);
        const response = await user.save();
        return response;
    } catch (error) {
        return error;
    }
};
exports.findOneByUser = async (data) => {
    try {
        var userData;
        userData = await User.findOne({
            emailId: data.emailId,
        }).select('-createdAt -updatedAt');;
        if (!userData) {
            throw new Error("No user Data found");
        }
        // const isPasswordValid = await bcrypt.compare(data.password, userData.dataValues.password);
        const isPasswordValid = data.password;

        if (isPasswordValid) {
            const token = jwt.sign(
                { username: userData.userName },
                process.env.SECRET_KEY,
                // { expiresIn: '1h' } 
            );
            return { token: token, role: userData.role };
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

