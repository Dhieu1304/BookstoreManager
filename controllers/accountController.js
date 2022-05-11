const accountService = require("../services/accountService");
const path = require("path");
const multer = require("multer");
/*

module.exports.getStaffPage = async (req, res) => {

    const data = await accountService.getAllAccount("staff");
    const pagination = {
        page: 3,
        limit: 10,
        totalRows: 30
    }

    res.render('account', {TypeName: 'Staff', data, pagination});
}

module.exports.getAdminPage = async (req, res) => {

    const data = await accountService.getAllAccount("admin");

    res.render('account', {TypeName: 'Admin', data});
}
*/

module.exports.getAllAccount = async (req, res) => {
    const data = await accountService.getAllAccount();

    res.render('account', {TypeName: "All Accounts", data});
}

module.exports.getAccounts = async (req, res) => {
    let role = '';
    if (req.query && req.query.role) {
        role = req.query.role;
    }
    else {
        return res.render('index');
    }

    /*if ( !req.user || (role === req.user.role) || req.user.role === "staff" || role === "superadmin") {
        return res.render('index');
    }*/


    const data = await accountService.getAllAccountByRole(role);

    res.render('account', {TypeName: role.charAt(0).toUpperCase() + role.slice(1), data});
}
/*

module.exports.getStaffDetail = async (req, res) => {

    const id = req.params.id;
    if (!id) {
        return res.render('index');
    }

    let data = await accountService.getAccountById(id);
    if (data.role !== "staff") {
        return res.render('index');
    }

    res.render('account/detail', {data});
}
*/

module.exports.getAccountDetail = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.render('index');
    }

    let data = await accountService.getAccountById(id);
    /*if (!req.user || (data.role === req.user.role) || req.user.role === "staff" || data.role === "superadmin") {
        return res.render('index');
    }*/

    res.render('account/detail', {data});
}

/*

module.exports.getAdminDetail = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.render('index');
    }

    let data = await accountService.getAccountById(id);
    if (data.role !== "admin") {
        return res.render('index');
    }

    res.render('account/detail', {data});
}
*/

module.exports.editAccountApi = async (req, res) => {
    const id = req.params.id;
    if (!id || !req.body.first_name|| !req.body.last_name|| !req.body.email|| !req.body.gender
        || !req.body.phone_number|| !req.body.address|| !req.body.role|| !req.body.status) {
        return res.status(200).json({
            errCode: 2,
            errMessage: "Missing Parameter!",
            data: {}
        })
    }

    let account = {
        id: id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        address: req.body.address,
        role: req.body.role,
        status: req.body.status,
    }

    let data = await accountService.editAccountById(account);

    if (data) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Edit Successful!",
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            }
        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: "Error! Please try again!!",
        data: {}
    })

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

module.exports.handleUpload = () => {
    return multer({storage: storage});
}

module.exports.UploadImage = async (req, res) => {

    const id = req.body.id;
    let link = req.file.path;
    link = link.substring(6, link.length); //remove 'public'

    const account = await accountService.editAvatarById(id, link);

    if (account) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Change avatar successful!",
            link: link
        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: "Error occurred!",
        link: ''
    });
}