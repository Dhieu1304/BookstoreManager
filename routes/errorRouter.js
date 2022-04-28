const express = require('express');
const router = express.Router();
const errorController = require("../controllers/errorController");

router.get('/401', errorController.err401);
router.get('/404', errorController.err404);
router.get('/500', errorController.err500);

module.exports = router;
