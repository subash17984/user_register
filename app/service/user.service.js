const user_Repository = require("../repository/user.repository");
exports.FindAll_service = (req, res) => {
    try {
        const response = user_Repository.findAll();
        return response;
    } catch (error) {
        return error;
    }
};
exports.create_Service = (data) => {
    try {
        const response = user_Repository.Create(data);
        return response;
    } catch (error) {
        return error;
    }
};
exports.findOneByuser = async (data) => {
    try {
        const responseData =await user_Repository.findOneByUser(data);
        return responseData;
    } catch (error) {
        throw error;
    }
};