var router = require("express").Router();
const tutorials = require("../controller/tutorial.controller");
router.get("/findAll",tutorials.tutorialFindall);

module.exports=router;