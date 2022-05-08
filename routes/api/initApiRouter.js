const express = require('express');
const router = express.Router();
const bookStockApiRouter = require("../../routes/api/bookStockApiRouter");



router.use('/stock', bookStockApiRouter);

module.exports = router;
