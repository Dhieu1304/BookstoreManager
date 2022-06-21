
const express = require('express');
const router = express.Router();
const saleApiController = require("../../controllers/api/saleApiController");

router.get('/', saleApiController.getAllSaleReceipts);
router.get('/export', saleApiController.exportSaleReceipts);

router.get('/:id', saleApiController.getSaleDetailById);
router.get('/:id/export', saleApiController.exportSaleReceiptDetails);

module.exports = router;
