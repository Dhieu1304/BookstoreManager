const express = require('express');
const router = express.Router();
const billController = require("../controllers/billController");

router.get('/', billController.getBillPage);
// router.get('/add', billController.addBillReceipt);

module.exports = router;
