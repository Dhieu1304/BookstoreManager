const emailServices = require("../services/emailService");
const accountService = require("../services/accountService");
const emailContent = require("../utils/emailContent");
const authService = require("../services/auth/authService");
const bcryptService = require("../services/bcryptService");

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
    const link = `http://localhost:${process.env.PORT}/email/reset-password/?code=${account.id}&token=${account.uid}`;
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


module.exports.resetPassword = async (req, res) => {

    res.render('auth/resetPassword', {layout: false});
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
