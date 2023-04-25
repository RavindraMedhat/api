const express = require("express");
const { order_add, order_list } = require("../controller/orderController");
const router = express.Router();

router.post('/add', order_add);

router.get('/list', order_list);

module.exports = router;