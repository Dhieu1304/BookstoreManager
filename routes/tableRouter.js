const express = require('express');
const router = express.Router();
const tableController = require("../controllers/table/bookController");
const multer  = require('multer')
//const multer = require("../utils/multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/products/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

router.get('/book', tableController.bookList);
router.get('/book/add', tableController.addBookPage);
router.post('/book/add', upload.any('pictures'), tableController.addBook);
router.get('/book/:id/action', tableController.editBookPage);
router.post('/book/:id/action', upload.any('pictures'), tableController.editBook);
router.get('/book/:id/delete', tableController.removeBook);
module.exports = router;
