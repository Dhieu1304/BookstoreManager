
const express = require('express');
const router = express.Router();
const bookApiController = require("../../controllers/api/bookApiController");

router.get('/', bookApiController.getAllBooks);


module.exports = router;
