const express = require('express');
const customerController = require("../controllers/customerController");
const router = express.Router();

router.get('/', customerController.customerPage);
router.post('/api/listCustomer', customerController.apiListCustomer);
router.get('/exportExcel', customerController.exportCustomer);
router.post('/api/customerDetail', customerController.apiCustomeDetail);
router.post('/api/apiEditCustomer', customerController.apiEditCustomer);


module.exports = router;
