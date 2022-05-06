const accountService = require("../services/accountService");

module.exports.getHomePage = async (req, res) => {

    const email = "d.hieu.13.04@gmail.com";

    const user = await accountService.getAccountByEmail(email);
    // const user = await authService.getUserbyEmail(email);

    console.log(user);

    res.render('index', {title: 'Dashboard'});
}
