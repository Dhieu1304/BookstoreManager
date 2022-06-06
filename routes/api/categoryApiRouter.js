const express = require('express');
const router = express.Router();
const categoryController = require("../../controllers/api/categoryApiController");
const bookStockApiController = require("../../controllers/api/bookStockApiController");

// router.get('/', categoryController.getAllAuthorInfor);
router.get('/names/:name', categoryController.getCategoryByName);

module.exports = router;
