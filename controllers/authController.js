module.exports.login = (req, res) => {
    res.render('auth/login', {layout: false, errorLogin: req.query.errorLogin !== undefined});
}

module.exports.register = (req, res) => {
    res.render('auth/register', {layout: false});
}

module.exports.forgotPassword = (req, res) => {
    res.render('auth/forgotPassword', {layout: false});
}

/*
exports.redirectAfterLogin = (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        res.redirect('/auth/login');
    }
}
*/

exports.checkAuthenticated = async (req, res, next) => {

    const nonSecurePaths = ['/auth/login', '/api/auth/login'];

    if (nonSecurePaths.includes(req.path)) {
        return next();
    }

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login')
}

exports.logout = async (req, res) => {
    req.logout();
    res.redirect('/auth/login');
}
