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
    passport.authenticate('local', function (error, user, info) {
        if (error) {
            console.log('error', error);
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Error has occurred',
            });
        }
        if (!user) {
            console.log('message', info.message);
            return res.status(200).json({
                errCode: 2,
                errMessage: info.message
            });
        }
        req.logIn(user, function (err) {
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
    /*
        const nonSecurePaths = ['/auth/login', '/auth/api/login'];

        if (nonSecurePaths.includes(req.path)) {
            return next();
        }
    */

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login')
}

module.exports.logout = async (req, res) => {
    req.logout();
    res.redirect('/auth/login');
}

module.exports.changePassword = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.redirect('/');
    }

    res.render('auth/changePassword');
}

module.exports.apiChangePassword = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(200).json({
            errCode: 4,
            errMessage: "401 Unauthoried!!"
        })
    }

    const {currentPassword, newPassword} = req.body;

    const user = await accountService.getAccountById(req.user.id);
    const checkPassword = await bcryptService.checkPassword(currentPassword, user.password);
    if (!checkPassword) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Incorrect Current Password!",
        })
    } else {
        const hashPassword = await bcryptService.hashPassword(newPassword)
        const changePass = await authService.changeAccountPasswordById(req.user.id, hashPassword);

        if (!changePass) {
            return res.status(200).json({
                errCode: 2,
                errMessage: "Error, Please try again later!",
            })
        } else {
            return res.status(200).json({
                errCode: 0,
                errMessage: "Change Password Successful!",
            })
        }
    }

}

module.exports.resetPassword = async (req, res) => {
    const token = atob(req.query.token);
    //id=17&uid=2d7beea6-ccac-11ec-9d64-0242ac120002
    const indexAnd = token.indexOf('&');
    const id = token.substring(3, indexAnd);
    const uid = token.substring(indexAnd + 5, token.length);
    const account = await accountService.getAccountById(id);
    if (!account || account.uid !== uid || account.status !== 'forgotPassword') {
        return res.render('errors/404', {layout: false});
    }
    res.render('auth/resetPassword', {layout: false, id});
}

module.exports.sendEmailResetPassword = async (req, res) => {

    const email = req.body.email;
    const account = await accountService.getAccountByEmail(email);
    if (!account) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Email incorrect!!"
        })
    } else {
        const isChangeStatus = await accountService.EditAccountStatusById(account.id, 'forgotPassword');
        if (!isChangeStatus) {
            return res.status(200).json({
                errCode: 2,
                errMessage: "Error, Please try again later",
            });
        }
    }

    const fullName = account.first_name + " " + account.last_name;
    const urlApp = (process.env.NODE_ENV === 'PRODUCTION') ? process.env.HURL_APP : `${process.env.URL_APP}:${process.env.PORT}`;
    const token = btoa(`id=${account.id}&uid=${account.uid}`);
    const link = `${urlApp}/auth/reset-password/?token=${token}`;
    const content = emailContent.content(fullName, link);
    let data = {
        receiverEmail: email,
        content: content,
        subject: "BookStore password reset confirmation"
    }

    const sendEmail = await emailServices.sendEmail(data);
    if (!sendEmail) {
        return res.status(200).json({
            errCode: 2,
            errMessage: "Error, Please try again later",
        });
    }

    return res.status(200).json({
        errCode: 0,
        errMessage: "Send Email Successful!",
    })

}

module.exports.resetNewPassword = async (req, res) => {

    const {id, newPassword, confirmPassword} = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(200).json({
            errCode: 3,
            errMessage: "Please check Confirm Password!!"
        })
    }

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error!! Something Wrong!!"
        })
    }

    const account = await accountService.getAccountById(id);

    if (!account) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error!! Something Wrong!!"
        })
    }

    const hashPassword = await bcryptService.hashPassword(newPassword);
    const changePassword = await authService.changeAccountPasswordById(id, hashPassword);

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