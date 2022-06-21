
const express = require('express');
const router = express.Router();
const importApiController = require("../../controllers/api/importApiController");

router.get('/', importApiController.getAllImportReceipts);
router.get('/export', importApiController.exportImportReceipts);

router.get('/:id', importApiController.getImportDetailById);
router.get('/:id/export', importApiController.exportImportReceiptDetails);


module.exports = router;
