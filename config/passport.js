let passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Promise = require("bluebird");
const UserModel = require('../users/users_model');
const SuccessMessage = require('../utils/customMessage').SuccessMessage;
const ErrorMessage = require('../utils/customMessage').ErrorMessage;
const SecurityUtil = require('../utils/SecurityUtil');

var crypto = require('crypto');

passport.use(new LocalStrategy({
    usernameField: 'username'
  },
  function(username, password, done) {
    UserModel.findOne({"username": username}).exec((err, user)=> {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        let errorMessage = new ErrorMessage(ErrorMessage.INVALID_USERNAME_PASSWORD, null);
        return done(null, false, errorMessage);
      }
      // Return if password is wrong
      if (!SecurityUtil.validPassword(password, user)) {
        let errorMessage = new ErrorMessage(ErrorMessage.INVALID_USERNAME_PASSWORD, null);
        return done(null, false, errorMessage);
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
