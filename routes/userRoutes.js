const express = require("express");
const router = express.Router();
const { user_add, user_by_name, user_is_there, user_list } = require("../controller/userController");

// add user
router.post("/add", user_add);

// get list of all users
router.get("/list", user_list);

// get user data by username
router.get("/:userName", user_by_name);

// check user is there or not
router.post("/isThere", user_is_there);

module.exports = router;