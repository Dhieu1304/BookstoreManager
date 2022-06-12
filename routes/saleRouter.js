const express = require('express');
const router = express.Router();
const saleController = require("../controllers/saleController");

router.get('/', saleController.getSalePage);
router.get('/add', saleController.getSaleAddPage);
router.post('/add', saleController.addSaleReceipt);

module.exports = router;
