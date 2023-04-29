const express = require("express");
const { add_progress, add_enddate, get_Progress } = require("../controller/orderProgressController");
const router = express.Router();

router.post('/add', add_progress);

router.put('/addEndDate', add_enddate);

router.get('/ByOrderId/:orderId', get_Progress);


module.exports = router;