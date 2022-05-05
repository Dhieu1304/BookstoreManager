const express = require('express');
const router = express.Router();
const passport = require('../services/auth/passport');
const authController = require("../controllers/authController");

router.get('/auth/login', authController.login);
router.get('/auth/register', authController.register);
router.get('/auth/forgot-password', authController.forgotPassword);

router.post('/api/auth/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if(error) {
            console.log('error', error);
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Error has occurred',
            });
        }
        if(!user) {
            console.log('message', info.message);
            return res.status(200).json({
                errCode: 2,
                errMessage: info.message
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                errCode: 0
            });
        });
    })(req, res, next);
});

// router.post('/auth/login', passport.authenticate('local'), authController.redirectAfterLogin);

module.exports = router;
