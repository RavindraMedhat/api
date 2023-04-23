const express = require("express");
const { customer_add } = require("../controller/");
const router = express.Router();

//add customer
router.post('/add',customer_add );

module.exports = router;