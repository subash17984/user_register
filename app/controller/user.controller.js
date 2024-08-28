const user_Service = require("../service/user.service");
const utils = require('../utils/common')
exports.findAll = async (req, res) => {
    try {

        const response = await user_Service.FindAll_service();
        return res.send(response)
    } catch (error) {
        return res.status(500).send({ message: err.message });
    }
};
exports.createUser = (req, res) => {
    try {
        const data = req.body
        utils.isEntitiesEmpty(data)
        const response = user_Service.create_Service(data);
        return res.send({ message: 'User saved successfully' });
    } catch (error) {
        return res.send({ message: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const data = req.body
        utils.isEntitiesEmpty(data)
        var responseData = await user_Service.findOneByuser(data);
        return res.send({ status: "success", responseData });
    } catch (error) {
        return res.send({ status: "error", error: error.message });
    }
}