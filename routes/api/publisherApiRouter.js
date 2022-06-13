const express = require('express');
const router = express.Router();
const publisherController = require("../../controllers/api/publisherApiController");
const categoryController = require("../../controllers/api/categoryApiController");

router.get('/', publisherController.getAllPublisherInfor);

router.get('/names/:name', publisherController.getPublisherByName);

router.post('/add', publisherController.addPublisher);


module.exports = router;
