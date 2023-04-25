const express = require("express");
const { customer_add, customer_list } = require("../controller/customerController");
const router = express.Router();

router.post('/add', customer_add);

router.get('/list', customer_list);

module.exports = router;