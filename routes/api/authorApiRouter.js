const express = require('express');
const router = express.Router();
const authorController = require("../../controllers/api/authorApiController");
const bookStockApiController = require("../../controllers/api/bookStockApiController");

router.get('/', authorController.getAllAuthorInfor);
router.get('/names/:name', authorController.getAuthorsByName);

router.post('/add', bookStockApiController.addAuthor);


module.exports = router;
