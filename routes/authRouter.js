const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

router.get('/auth/login', authController.login);
router.get('/auth/logout', authController.logout);
router.get('/auth/register', authController.register);
router.get('/auth/forgot-password', authController.forgotPassword);

router.post('/api/auth/login', authController.apiAuthLogin);

module.exports = router;
