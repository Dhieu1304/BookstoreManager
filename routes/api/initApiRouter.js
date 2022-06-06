const express = require('express');
const router = express.Router();
const bookStockApiRouter = require("../../routes/api/bookStockApiRouter");
const customerApiRouter = require("../../routes/api/customerApiRouter");
const publisherApiRouter = require("../../routes/api/publisherApiRouter");
const authorApiRouter = require("../../routes/api/authorApiRouter");
const categoryApiRouter = require("../../routes/api/categoryApiRouter");



router.use('/stock', bookStockApiRouter);
router.use('/customer', customerApiRouter);
router.use('/publisher', publisherApiRouter);
router.use('/author', authorApiRouter);
router.use('/category', categoryApiRouter);

module.exports = router;
