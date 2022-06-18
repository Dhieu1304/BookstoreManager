
const express = require('express');
const router = express.Router();
const billApiController = require("../../controllers/api/billApiController");

router.get('/', billApiController.getAllBills);
router.get('/export', billApiController.exportBills);

// router.get('/:id', billApiController.getBillDetailById);
// router.get('/:id/export', billApiController.exportBillDetails);

module.exports = router;
