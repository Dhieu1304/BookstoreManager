const express = require('express');
const router = express.Router();
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");
const multer = require("../utils/multer");


router.get('/', accountController.getAccounts);
router.post('/api/edit/:id', accountController.editAccountApi);
router.get('/detail/:id', accountController.getAccountDetail);
router.post('/detailAccount/', accountController.getAccountInfo);
router.post('/uploads/image', multer.handleUpload().single('avatar'), accountController.UploadImage);
router.post('/api/listAccount', accountController.apiListAccount);
router.post('/api/editStatus', accountController.editStatusAccount);
router.post('/api/addNewAccount', accountController.addNewAccount);
router.get('/exportAccountData', accountController.exportAccountData);

module.exports = router;
