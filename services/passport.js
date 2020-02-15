const LocalStrategy = require('passport-local');
const User = require('../models/User');
const { comparePassword } = require('../services/cryptPassword');


const initialize = passport => {
    const authenticateUser = (email, password, done) => {
        const user = new User();
        user.findByEmail(email, (error, userCheck) => {
            if(error) throw error;
            if(!userCheck[0]) {
                return done(null, false, { message: "Cet email n'existe pas !" });
            }
            comparePassword(password, userCheck[0].password).then(isMatch => {
                if(isMatch) return done(null, userCheck);
            }).catch(err => {
                return done(null, false, { message: err });
            })
        })
    };
    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user[0].id);
    });
    passport.deserializeUser((id, done) => {
        const user = new User();
        user.findById(id, (error, user) => {
            done(error, user);
        });
    });
};

module.exports = initialize;
