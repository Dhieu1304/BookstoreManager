const express = require('express');
const router = express.Router();
const importController = require("../controllers/importController");

router.get('/', importController.getImportPage);
router.get('/add', importController.addImportReceipt);

module.exports = router;
