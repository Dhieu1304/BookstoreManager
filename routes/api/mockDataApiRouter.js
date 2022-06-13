const express = require('express');
const router = express.Router();
const mockDataController = require("../../controllers/api/mockDataApiController");



router.get('/price', mockDataController.getAllPrices);


module.exports = router;
