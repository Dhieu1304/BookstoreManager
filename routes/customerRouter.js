const express = require('express');
const customerController = require("../controllers/customerController");
const router = express.Router();

router.get('/', customerController.customerPage);
router.post('/api/listCustomer', customerController.apiListCustomer);
router.get('/exportExcel', customerController.exportCustomer);



module.exports = router;
