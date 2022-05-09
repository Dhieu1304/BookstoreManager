const express = require('express');
const router = express.Router();
const authorController = require("../../controllers/api/authorApiController");

router.get('/', authorController.getAllAuthorInfor);


module.exports = router;
