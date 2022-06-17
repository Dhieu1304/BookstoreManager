
const express = require('express');
const router = express.Router();
const importApiController = require("../../controllers/api/importApiController");

router.get('/', importApiController.getAllImportReceipts);
router.get('/export', importApiController.exportImportReceipts);


module.exports = router;
