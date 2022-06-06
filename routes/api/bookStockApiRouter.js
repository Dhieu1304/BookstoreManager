const express = require('express');
const router = express.Router();
const bookStockApiController = require("../../controllers/api/bookStockApiController");

router.get('/', bookStockApiController.getAllBookStock);
router.post('/book/add', bookStockApiController.addBook);

router.post('/category/add', bookStockApiController.addCategory);
router.post('/publisher/add', bookStockApiController.addPublisher);

router.get('/isbns/:isbn', bookStockApiController.getBookStockByIsbn);

router.get('/:id', bookStockApiController.getBookStockByBookId);


module.exports = router;
