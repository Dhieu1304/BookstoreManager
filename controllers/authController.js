const passport = require("../services/auth/passport");
const accountService = require("../services/accountService");

module.exports.login = (req, res) => {
    res.render('auth/login', {layout: false, errorLogin: req.query.errorLogin !== undefined});
}

module.exports.register = (req, res) => {
    res.render('auth/register', {layout: false});
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

    const nonSecurePaths = ['/auth/login', '/api/auth/login'];

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

module.exports.myAccount =  async (req, res) => {
    const data = await accountService.getAccountById(req.user.id);

    res.render('account/detail', {TypeName: "My Account", data});
}
