var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');
var app = express();
var passport = require('passport');

// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
//app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/legal_aid');

var port = process.env.PORT || 3000;
app.use('/', index);
app.use('/users', users);
app.use('/questions', questions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port);
console.log('Listening port ' + port);