let components = require('./components');
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_KEY,
  userProperty: 'payload'
});


components.auth = auth;
exports.components = components;
