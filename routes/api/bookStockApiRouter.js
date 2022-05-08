const express = require('express');
const router = express.Router();
const saleApiController = require("../../controllers/api/bookStockApiController");

router.get('/', saleApiController.getListBookStock);

module.exports = router;
