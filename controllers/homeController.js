const authService = require("../services/auth/authService");

module.exports.getHomePage = async (req, res) => {

    const email = "d.hieu.13.04@gmail.com";

    const user = await authService.getUserbyId(1);
    // const user = await authService.getUserbyEmail(email);

    console.log(user);

    res.render('index', {title: 'Dashboard'});
}
