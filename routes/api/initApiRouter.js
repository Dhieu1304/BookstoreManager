const express = require('express');
const router = express.Router();
const bookStockApiRouter = require("../../routes/api/bookStockApiRouter");
const customerApiRouter = require("../../routes/api/customerApiRouter");
const publisherApiRouter = require("../../routes/api/publisherApiRouter");
const authorApiRouter = require("../../routes/api/authorApiRouter");
const categoryApiRouter = require("../../routes/api/categoryApiRouter");
const importApiRouter = require("./importApiRouter");
const saleApiRouter = require("./saleApiRouter");
const billApiRouter = require("./billApiRouter");
const mockDataApiRouter = require("../../routes/api/mockDataApiRouter");



router.use('/stock', bookStockApiRouter);
router.use('/customer', customerApiRouter);
router.use('/publisher', publisherApiRouter);
router.use('/author', authorApiRouter);
router.use('/category', categoryApiRouter);
router.use('/import', importApiRouter);
router.use('/sale', saleApiRouter);
router.use('/bill', billApiRouter);
router.use('/mock', mockDataApiRouter);

module.exports = router;
