const express = require("express");
const { customer_add, customer_list, customer_search, customer_sort_last_10 } = require("../controller/customerController");
const router = express.Router();

router.post('/add', customer_add);

router.get('/list', customer_list);

router.get('/search/:name', customer_search);

router.get('/sort_last_10', customer_sort_last_10);


module.exports = router;