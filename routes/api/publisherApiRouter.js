const express = require('express');
const router = express.Router();
const publisherController = require("../../controllers/api/publisherApiController");

router.get('/', publisherController.getAllPublisherInfor);


module.exports = router;
