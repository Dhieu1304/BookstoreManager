const express = require('express');
const router = express.Router();
const billController = require("../controllers/billController");

router.get('/', billController.getBillPage);
router.get('/add', billController.getBillAddPage);
router.get('/:id', billController.getBillDetailPage);
router.post('/add', billController.addBill);

module.exports = router;
