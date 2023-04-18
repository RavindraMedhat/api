const express = require("express");
const router = express.Router();
const garmentsType_controller = require("../controller/garmentsTypeController");

const upload = require ("../middlerware/upload");
// add user
router.post("/add",upload.single('garmentsImage'), garmentsType_controller.garmentsType_add);

// get list of all users
router.get("/list", garmentsType_controller.garmentsType_list);

// // get user data by username
// router.get("/:userName", garmentsType_controller);

// // check user is there or not
// router.post("/isThere", garmentsType_controller);

module.exports = router;