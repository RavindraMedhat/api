const express = require("express");
const { report_list } = require("../controller/sellReportController");
const router = express.Router();

router.get('/list', report_list);

module.exports = router;