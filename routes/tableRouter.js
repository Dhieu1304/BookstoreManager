const express = require('express');
const router = express.Router();
const tableController = require("../controllers/table/bookController");

// router.get('/user', table.user);
router.get('/book', tableController.bookList);

module.exports = router;
