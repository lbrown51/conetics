var LocalStrategy = require('passport-local').Strategy;
var model = require('../models/datamodel.js')

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    model.Admin.findById(id, function(err, user){
      done(err, user)
    })
  });

  passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        model.Admin.findOne({ 'local.email' :  email }, function(err, admin) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (admin) {
                return done(null, false);
            } else {

                // if there is no user with that email
                // create the user
                var newAdmin = new model.Admin();

                // set the user's local credentials
                newAdmin.local.email    = email;
                newAdmin.local.password = newAdmin.generateHash(password);

                // save the user
                newAdmin.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newAdmin);
                });
            }

        });

        });

    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        model.Admin.findOne({ 'local.email' :  email }, function(err, admin) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!admin)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!admin.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, admin);
        });

    }));


};
