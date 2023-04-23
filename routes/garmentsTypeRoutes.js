const express = require("express");
const router = express.Router();
const { garmentsType_add, garmentsType_list, garmentsType_remove } = require("../controller/garmentsTypeController");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
// add garmentsType
router.post("/add", upload.single('garmentImage'), garmentsType_add);

// remove garmentsType
router.delete("/remove/:id", garmentsType_remove);

// get list of all garmentsType
router.get("/list", garmentsType_list);


module.exports = router;