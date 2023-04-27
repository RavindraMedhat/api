const express = require("express");
const { order_add, order_list, order_ByOrderId, order_ByCustomerId } = require("../controller/orderController");
const router = express.Router();

router.post('/add', order_add);

router.get('/list', order_list);

router.get('/ByOrderId/:id', order_ByOrderId);

router.get('/ByCustomerId/:c_id', order_ByCustomerId);

module.exports = router;