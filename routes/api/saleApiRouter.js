
const express = require('express');
const router = express.Router();
const saleApiController = require("../../controllers/api/saleApiController");

router.get('/', saleApiController.getAllSaleReceipts);


module.exports = router;
