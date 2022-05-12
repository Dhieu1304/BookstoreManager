const session = require("express-session");
const passport = require("../services/auth/passport");

module.exports.configPassport = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}