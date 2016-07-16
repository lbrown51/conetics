var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');


var models = require('./models/datamodel.js');
var routes = require('./routes/index');
var people = require('./routes/people');
var papers = require('./routes/papers');
var passportGithub = require('./auth/github')

var app = express();


// var stream = client.stream('statuses/filter');
// stream.on('data', function(tweet){
//   console.log(tweet.text)
// })
//
// stream.on('error', function(error){
//   throw error;
// })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.get('/people', people);
app.get('/papers', papers);
app.post('/*person', ensureAuthenticated, people);
app.post('/*paper', ensureAuthenticated, papers);

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});




function ensureAuthenticated(req, res, next) {
  console.log(req)
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
