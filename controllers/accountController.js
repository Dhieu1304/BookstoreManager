const accountService = require("../services/accountService");

module.exports.getStaffPage = async (req, res) => {
    res.render('account', {TypeName: 'Staff'});
}

module.exports.getAdminPage = async (req, res) => {
    res.render('account', {TypeName: 'Admin'});
}

module.exports.ApiGetAllAccount = async (req, res) => {

    const role = req.query.role || 'staff';

    const accounts = await accountService.getAllAccount(role);

    if (accounts) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            data: accounts
        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: 'Error has occurred',
        data: {}
    })

}
