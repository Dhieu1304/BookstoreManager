const passport = require("../services/auth/passport");
const accountService = require("../services/accountService");
const bcryptService = require("../services/bcryptService");
const authService = require("../services/auth/authService");

module.exports.login = (req, res) => {
    res.render('auth/login', {layout: false});
}

module.exports.forgotPassword = (req, res) => {
    res.render('auth/forgotPassword', {layout: false});
}

module.exports.apiAuthLogin = (req, res, next) => {
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
}

module.exports.checkAuthenticated = async (req, res, next) => {

    const nonSecurePaths = ['/auth/login', '/api/auth/login'];

    if (nonSecurePaths.includes(req.path)) {
        return next();
    }

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login')
}

module.exports.logout = async (req, res) => {
    req.logout();
    res.redirect('/auth/login');
}

module.exports.checkAdmin = async (req, res, next) => {
    if (req.user) {
        if (req.user.role === 'admin'){
            return next();
        }
    }

    res.redirect('/');
}

module.exports.checkAdminSuperAdmin = async (req, res, next) => {
    if (req.user) {
        if (req.user.role === 'admin' || req.user.role === 'superadmin'){
            return next();
        }
    }

    res.redirect('/');
}

module.exports.checkSuperAdmin = async (req, res, next) => {
    if (req.user) {
        if (req.user.role === 'superadmin'){
            return next();
        }
    }

    res.redirect('/');
}

module.exports.changePassword = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.redirect('/');
    }

    res.render('auth/changePassword');
}

module.exports.apiChangePassword = async (req, res, next) => {
    if (!req.user || !req.user.id || !req.user.email) {
        return res.redirect('/');
    }

    const {currentPassword, newPassword} = req.body;

    const user = await accountService.getAccountByEmail(req.user.email);
    const checkPassword = await bcryptService.checkPassword(currentPassword, user.password);
    if (!checkPassword) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Incorrect Current Password!",
        })
    }
    else {
        const hashPassword = await bcryptService.hashPassword(newPassword)
        const changePass = await authService.changeAccountPassword(req.user.email, hashPassword);

        if (!changePass) {
            return res.status(200).json({
                errCode: 2,
                errMessage: "Error, Please try again later!",
            })
        }
        else {
            return res.status(200).json({
                errCode: 0,
                errMessage: "Change Password Successful!",
            })
        }
    }

}

