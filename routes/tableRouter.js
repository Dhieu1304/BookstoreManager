const express = require('express');
const router = express.Router();
const tableController = require("../controllers/table/bookController");


router.get('/book', tableController.bookList);
router.get('/book/add', tableController.addBookPage);
router.post('/book/add', tableController.addBook);
router.get('/book/:id/action', tableController.editBookPage);
router.post('/book/:id/action', tableController.editBook);
router.get('/book/:id/delete', tableController.removeBook);
module.exports = router;
