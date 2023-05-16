const express = require("express");
const { addRecord, getRecords, updateReceivingDate } = require("../controller/garmentTrackingControler");
const router = express.Router();

router.post('/addRecord', addRecord);

router.put('/updateRecord', updateReceivingDate);

router.get('/ByGarmentTrackingId/:garmentTrackingId', getRecords);

router.get('/list', getRecords);

module.exports = router;
