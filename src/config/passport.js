const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy( {
    usernameField: 'username',
    passwordField: 'password'
    },async (username, password, done) => {

        const user = await User.findOne({ username: username });
        //Match Username
        if (!user) {
            return done(null, false, { message: 'Not User found.', type: 'error' });
        } else {
            // Match Password's User
            const match = await user.matchPassword(password);
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect Password.', type: 'error' });
            }
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});