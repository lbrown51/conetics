var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var models = require('../models/datamodel.js');
var config = require('../_config');
var init = require('./init');

passport.use(new GitHubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
      email: profile.login
    };


    // update the user if s/he exists or add a new user
    models.Person.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into the session
init();

module.exports = passport;
