const express = require('express');
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post('/api/resetPassword', emailController.sendEmailResetPassword);
router.get('/reset-password', emailController.resetPassword);
router.post('/api/resetNewPassword', emailController.resetNewPassword);

module.exports = router;
