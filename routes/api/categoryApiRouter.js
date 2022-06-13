const express = require('express');
const router = express.Router();
const categoryController = require("../../controllers/api/categoryApiController");
const authorController = require("../../controllers/api/authorApiController");
// const bookStockApiController = require("../../controllers/api/bookStockApiController");

router.get('/', categoryController.getAllCategoryInfor);
router.get('/names/:name', categoryController.getCategoryByName);

router.post('/add', categoryController.addCategory);

module.exports = router;
