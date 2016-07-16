var passport = require('passport');
var model = require('../models/datamodel.js')

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.login);
  });

  passport.deserializeUser(function(login, done) {
    model.Person.findOne({ email: login+"*" }, function(err, user){
      done(err, obj)
    })
  });

};
