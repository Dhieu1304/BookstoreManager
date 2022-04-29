module.exports.login = (req, res) => {
    res.render('auth/login', {layout: false});
}

module.exports.register = (req, res) => {
    res.render('auth/register', {layout: false});
}

module.exports.forgotPassword = (req, res) => {
    res.render('auth/forgotPassword', {layout: false});
}
