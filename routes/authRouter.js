const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

router.get('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/forgot-password', authController.forgotPassword);
router.get('/change-password', authController.changePassword);
router.get('/reset-password', authController.resetPassword);

router.post('/api/login', authController.apiAuthLogin);
router.post('/api/changePassword', authController.apiChangePassword);

router.post('/api/resetPassword', authController.sendEmailResetPassword);
router.post('/api/resetNewPassword', authController.resetNewPassword);

module.exports = router;
