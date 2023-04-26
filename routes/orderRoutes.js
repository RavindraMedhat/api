const express = require("express");
const { order_add, order_list, order_ByOrderId } = require("../controller/orderController");
const router = express.Router();

router.post('/add', order_add);

router.get('/list', order_list);

router.get('/ByOrderId/:id', order_ByOrderId);

module.exports = router;