const express = require('express');
const router = express.Router();
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");


// router.get('/staff', authController.checkAdmin, accountController.ApiGetAllAccount);
// router.get('/staff', accountController.ApiGetAllAccount);
router.get('/staff', accountController.getStaffPage);
router.get('/admin', accountController.getAdminPage);

module.exports = router;
