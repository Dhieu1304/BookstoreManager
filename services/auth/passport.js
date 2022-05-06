const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcryptService = require("../bcryptService");
const accountService = require("../accountService");


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) {
        try {
            const user = await accountService.getAccountByEmail(email);

            if (!user) {
                console.log('Sai email');
                return done(null, false, {message: 'Incorrect email!'});
            }

            const checkPassword = await bcryptService.checkPassword(password, user.password);

            if (!checkPassword) {
                console.log('Sai mat khau');
                return done(null, false, {message: 'Incorrect password!'});
            }

            if (user.status === 'lock') {
                return done(null, false, {message: 'Your account has been locked!'});
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser(function (user, done) {
    console.log('serializeUser', user.id);

    // done(null, user.id);
    done(null, {
        id: user.id,
        email: user.email,
        last_name: user.last_name,
        avatar: user.avatar,
        role: user.role
    });

    // const {id, email, last_name, avatar} = user;
    // done(null, {id, email, last_name, avatar});
});

/*
passport.deserializeUser(async function (id, done) {
    const user = await accountService.getAccountById(id)

    console.log('deserializeUser', user);

    done(null, user);
});*/

passport.deserializeUser(async function (user, done) {
    done(null, user);
});

module.exports = passport;
