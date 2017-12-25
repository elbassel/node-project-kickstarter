const  express = require('express');
const  path = require('path');
const  favicon = require('serve-favicon');
const  logger = require('morgan');
const  cookieParser = require('cookie-parser');
const  bodyParser = require('body-parser');
const  passport = require('passport');

require('dotenv').config({path: './config/.env'})
require('./config');


const  users = require('./users/users_route');
const authRoute = require('./auth/authentication');
let  app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const helmet = require('helmet');
//for security part
app.use(helmet());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
require('./config/passport');
app.use('/', authRoute);
app.use('/users', users);
app.get('/status' , (req, res)=> res.send({status : "Up and running"}))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const  err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
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

// const MailUtil = require('./utils/MailUtils');
// const configMail = require('./config').components.mail;
// const CONSTANTS = require('./utils/constants');
// MailUtil.sendEmail(configMail.SUPPORT.CONFIG, CONSTANTS.MAIL_TEMPLATES.SUPPORT, "Testing Mails", {"some" : "data"}, "elbassel.n13@gmail.com");
