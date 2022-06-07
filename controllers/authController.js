const passport = require("../services/auth/passport");
const accountService = require("../services/accountService");
const bcryptService = require("../services/bcryptService");
const authService = require("../services/auth/authService");
const emailContent = require("../utils/emailContent");
const emailServices = require("../services/emailService");

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

    const nonSecurePaths = ['/auth/login', '/auth/api/login'];

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

module.exports.resetPassword = async (req, res) => {
    res.render('auth/resetPassword', {layout: false});
}

module.exports.sendEmailResetPassword = async (req, res) => {

    const email = req.body.email;

    const account = await accountService.getAccountByEmail(email);

    if (!account) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Email incorrect!!"
        })
    }

    const fullName = account.first_name + " " + account.last_name;
    const link = `http://localhost:${process.env.PORT}/auth/reset-password/?code=${account.id}&token=${account.uid}`;
    const content = emailContent.content(fullName, link);
    let data = {
        receiverEmail: email,
        content: content
    }

    const sendEmail = await emailServices.sendEmail(data);
    if (!sendEmail) {
        return res.status(200).json({
            errCode: 2,
            errMessage: "Error, Please try again later",
        })
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: "Send Email Successful!",
    })

}

module.exports.resetNewPassword = async (req, res) => {

    const {id, uid, newPassword} = req.body;

    const account = await accountService.getAccountById(id);

    if (!account) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error!! Something Wrong!!"
        })
    }

    if (account.uid !== uid) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error!! Something Wrong!!"
        })
    }

    const hashPassword = await bcryptService.hashPassword(newPassword);
    const changePassword = await authService.changeAccountPassword(account.email, hashPassword);

    if (!changePassword) {
        return res.status(200).json({
            errCode: 2,
            errMessage: "Error, Please tray again later!",
        })
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: "Reset Password Successful!",
    })

}