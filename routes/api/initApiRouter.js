const express = require('express');
const router = express.Router();
const bookStockApiRouter = require("../../routes/api/bookStockApiRouter");
const customerApiRouter = require("../../routes/api/customerApiRouter");



router.use('/stock', bookStockApiRouter);
router.use('/customer', customerApiRouter);

module.exports = router;
