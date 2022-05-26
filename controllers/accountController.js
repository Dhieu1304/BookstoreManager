const accountService = require("../services/accountService");
const {v4: uuidv4} = require('uuid');
const bcryptService = require("../services/bcryptService");

const checkRole = (userRole, accountRole) => {

    if (userRole === "superadmin" && (accountRole === "admin" || accountRole === "staff")) {
        return true;
    }

    if (userRole === "admin" && accountRole === "staff") {
        return true;
    }

    return false;
}

module.exports.getAllAccount = async (req, res) => {
    const data = await accountService.getAllAccount();

    res.render('account', {TypeName: "All Accounts", data});
}

module.exports.getAccounts = async (req, res) => {
    /*const role = req.query.role;

    /!*if (checkRole(req.user.role, role)){
        console.log("user Role is true");
    }else {
        console.log("\n>>>you don't have permission to access this page!\n");
        return res.render('index');
    }*!/

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;


    const data = await accountService.getAllAccountByRole(role, page, limit);

    const pagination = {
        page: page,
        limit: limit,
        totalRows: data.count,
    }

    res.render('account', {TypeName: role.charAt(0).toUpperCase() + role.slice(1), data: data.rows, pagination});*/
    const pagination = {
        page: 1,
        limit: 5,
        totalRows: 7,
    }
    // res.locals.pagination = pagination;
    // res.render('account', {pagination});
    res.render('account');
}


module.exports.getAccountDetail = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.render('index');
    }

    let data = await accountService.getAccountById(id);

    /*if (checkRole(req.user.role, data.role)){
        console.log("user Role is true");
    }*/

    res.render('account/detail', {data});
}

module.exports.editAccountApi = async (req, res) => {
    const id = req.params.id;
    if (!id || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.gender
        || !req.body.phone_number || !req.body.address || !req.body.role || !req.body.status) {
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

module.exports.apiListAccount = async (req, res) => {
    /*if (checkRole(req.user.role, role)){
        console.log("user Role is true");
    }else {
        console.log("\n>>>you don't have permission to access this page!\n");
        return res.render('index');
    }*/


    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 5;
    const {role, search, gender, status} = req.body;

    let filter = {
        role: role,
        page: page,
        limit: limit,
        search: search,
        gender: gender,
        status: status
    }

    console.log('filter:', filter);
    //const data = await accountService.getAllAccountByRole(role, page, limit);

    // const accounts = await accountService.getAllAccountByRole(filter.role, filter.page, filter.limit);
    const accounts = await accountService.getAccountsFilter(filter);

    /*const pagination = {
        page: page,
        limit: limit,
        totalRows: accounts.count || 0
    }*/

    let pagination = {
        page: filter.page,
        limit: filter.limit,
        totalRows: 0,
    }
    if (accounts) {

        pagination.totalRows = accounts.count;

        return res.status(200).json({
            errCode: 0,
            errMessage: "Successful!",
            data: {
                accounts: accounts.rows,
                pagination: pagination
            },

        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: "Error!",
        data: {
            accounts: {},
            pagination: pagination
        }
    })
}

module.exports.editStatusAccount = async (req, res) => {
    let {id, status} = req.body;

    if (!id || !status) {
        return res.status(200).json({
            errCode: 2,
            errMessage: "Missing Parameter",
        })
    } else {
        if (status !== 'active' && status !== 'locked') {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Error! Please try again!!",
            })
        }
    }

    let data = await accountService.EditAccountStatusById(id, status.toLowerCase());

    if (data) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Successful!"
        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: "Error! Please try again!!",
    })

}

module.exports.addNewAccount = async (req, res) => {

    let {first_name, last_name, email, phone_number, gender, role, address} = req.body;

    if (!first_name || !last_name || !email) {
        return res.status(200).json({
            errCode: 2,
            errMessage: "Missing Parameter",
        })
    } else {
        const existAccount = await accountService.getAccountByEmail(email);

        if (existAccount) {
            return res.status(200).json({
                errCode: 3,
                errMessage: "This email is already in use!!",
            })
        }
    }

    const uid = uuidv4();
    const password = first_name + last_name;
    const hashPassword = await bcryptService.hashPassword(password.toLowerCase());
    let account = {first_name, last_name, email, password: hashPassword, phone_number, gender, role, address, uid: uid};

    let data = await accountService.addNewAccount(account);

    if (data) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Successful!"
        })
    }

    return res.status(200).json({
        errCode: 1,
        errMessage: "Error! Please try again!!",
    })
}

