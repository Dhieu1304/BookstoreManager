const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

router.get('/auth/login', authController.login);
router.get('/auth/logout', authController.logout);
router.get('/auth/my-account', authController.myAccount);
router.get('/auth/forgot-password', authController.forgotPassword);
router.get('/auth/change-password', authController.changePassword);
router.get('/auth/verifyEmail', (req, res, next) => {
    res.render('auth/verifyEmail', {layout: false});
});

router.post('/api/auth/login', authController.apiAuthLogin);
router.post('/api/auth/changePassword', authController.apiChangePassword);

module.exports = router;
