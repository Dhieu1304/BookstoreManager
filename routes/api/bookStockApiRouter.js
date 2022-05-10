const express = require('express');
const router = express.Router();
const bookStockApiController = require("../../controllers/api/bookStockApiController");

router.get('/', bookStockApiController.getAllBookStock);
router.get('/book/add', bookStockApiController.addBook);

router.get('/category/add', bookStockApiController.addCategory);
router.get('/publisher/add', bookStockApiController.addPublisher);
router.get('/author/add', bookStockApiController.addAuthor);


module.exports = router;
