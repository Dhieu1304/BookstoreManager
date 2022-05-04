const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcryptService = require("../bcryptService");
const authService = require("./authService");


passport.use(new LocalStrategy(
    async function (email, password, done) {
        try {

            const user = await authService.getUserbyEmail(email);

            if (!user) {
                return done(null, false, { message: 'Incorrect email!' });
            }

            const checkPassword = await bcryptService.checkPassword(password, user.password);

            if (!checkPassword) {
                return done(null, false, { message: 'Incorrect password!' });
            }

            if (user.status === 'lock') {
                return done(null, false, { message: 'Your account has been locked!' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser(function (user, done) {
    const { id, email, last_name, avatar } = user;
    done(null, { id, email, last_name, avatar });

});

passport.deserializeUser(function (user, done) {
    return done(null, user);
});

module.exports = passport;
