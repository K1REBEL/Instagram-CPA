const { getData, selectFollowers, congrats } = require("./controller/request.controller.js");
const validationFun = require("../middleware/validation.js");
const {auth} = require("../middleware/auth.js");

const router = require("express").Router();


router.get("/getUserData", getData);
router.get("/processing/:username", selectFollowers);
router.post("/congratulations", auth(), congrats);



module.exports = router;