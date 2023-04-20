const express = require("express");
const router = express.Router();
const garmentsType_controller = require("../controller/garmentsTypeController");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
// add garmentsType
router.post("/add", upload.single('garmentImage'), garmentsType_controller.garmentsType_add);

// remove garmentsType
router.delete("/remove/:id", garmentsType_controller.garmentsType_remove);

// get list of all garmentsType
router.get("/list", garmentsType_controller.garmentsType_list);

// // get user data by username
// router.get("/:userName", garmentsType_controller);

// // check user is there or not
// router.post("/isThere", garmentsType_controller);

module.exports = router;