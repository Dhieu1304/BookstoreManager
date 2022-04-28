const express = require('express');
const router = express.Router();
const tableController = require("../controllers/tableController");

router.get('/', tableController.table);

module.exports = router;
