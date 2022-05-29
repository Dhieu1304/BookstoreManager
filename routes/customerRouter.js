const express = require('express');
const customerController = require("../controllers/customerController");
const router = express.Router();

router.get('/', customerController.customerPage);
router.post('/api/listCustomer', customerController.apiListCustomer);

module.exports = router;
