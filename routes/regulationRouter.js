const express = require('express');
const router = express.Router();
const regulationController = require("../controllers/regulationController");

router.get('/', regulationController.getRegulationPage);
router.get('/api/listRegulation', regulationController.getRegulations);
router.post('/api/editRegulation', regulationController.editRegulations);

router.get('/api/min-import', regulationController.getMinImport);
router.get('/api/min-stock-import', regulationController.getMinStockImport);
router.get('/api/max-dept', regulationController.getMaxDept);
router.get('/api/min-stock-sale', regulationController.getMinStockSale);

module.exports = router;
