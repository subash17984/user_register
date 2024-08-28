var router = require("express").Router();
const user = require("../controller/user.controller");
const tokenCheck = require("../middleware/user.middleware");
router.get("/findAll", tokenCheck, user.findAll);
router.post("/create", user.createUser)
router.post("/login", user.login);
module.exports = router;