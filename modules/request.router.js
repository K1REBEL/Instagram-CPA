const { getData, } = require("./controller/request.controller.js");
const validationFun = require("../middleware/validation.js");

const router = require("express").Router();


router.get("/getUserData", getData);



module.exports = router;