
const express = require('express');
const router = express.Router();
const importApiController = require("../../controllers/api/importApiController");

router.get('/', importApiController.getAllImportReceipts);


module.exports = router;
