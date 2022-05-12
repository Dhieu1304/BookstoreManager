const express = require('express');
const router = express.Router();
const billController = require("../controllers/billController");

router.get('/', billController.getBillPage);
router.post('/add', billController.addBill);

module.exports = router;
