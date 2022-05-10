const express = require('express');
const router = express.Router();
const bookStockApiController = require("../../controllers/api/bookStockApiController");

router.get('/', bookStockApiController.getAllBookStock);
router.get('/book/add', bookStockApiController.addBook);

router.post('/category/add', bookStockApiController.addCategory);
router.post('/publisher/add', bookStockApiController.addPublisher);
router.post('/author/add', bookStockApiController.addAuthor);


module.exports = router;
