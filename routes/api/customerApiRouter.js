const express = require('express');
const router = express.Router();
const customerApiController = require("../../controllers/api/customerApiController");

router.get('/', customerApiController.getAllCustomerInfor);

module.exports = router;
