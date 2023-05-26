const express = require("express");
const { addRecord, getRecords, updateReceivingDate, getRecord, add_garment } = require("../controller/garmentTrackingControler");
const router = express.Router();

router.post('/addRecord', addRecord);

router.post('/addGarment', add_garment);

router.put('/updateRecord', updateReceivingDate);

router.get('/ByGarmentTrackingId/:garmentTrackingId', getRecord);

router.get('/list', getRecords);

module.exports = router;
