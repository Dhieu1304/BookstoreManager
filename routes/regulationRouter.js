const express = require('express');
const router = express.Router();
const regulationController = require("../controllers/regulationController");

router.get('/', regulationController.getRegulationPage);
router.get('/api/listRegulation', regulationController.getRegulations);
router.post('/api/getRegulationById', regulationController.getRegulationById);
// router.post('/api/editRegulation', regulationController.editRegulations);
router.post('/api/editRegulation', regulationController.editRegulation);

router.get('/api/min-import', regulationController.getMinImport);
router.get('/api/min-stock-import', regulationController.getMinStockImport);
router.get('/api/max-dept', regulationController.getMaxDept);
router.get('/api/min-stock-sale', regulationController.getMinStockSale);
router.get('/api/max-bill-money', regulationController.getMaxBillMoney);

module.exports = router;
