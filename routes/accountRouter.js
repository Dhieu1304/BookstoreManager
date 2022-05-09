const express = require('express');
const router = express.Router();
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");


// router.get('/staff', authController.checkAdmin, accountController.ApiGetAllAccount);
// router.get('/staff', accountController.ApiGetAllAccount);
router.get('/staff', accountController.getStaffPage);
router.get('/staff/:id', accountController.getStaffDetail);
router.get('/admin', accountController.getAdminPage);
router.get('/admin/:id', accountController.getAdminDetail);
router.post('/api/edit/:id', accountController.editAccountApi);
router.post('/upload/image', accountController.handleUpload().single('avatar'), accountController.UploadImage);

module.exports = router;
