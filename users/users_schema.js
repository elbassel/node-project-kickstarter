const mongoose = require('mongoose');
const SecurityUtils = require('../utils/SecurityUtil');
let userSchema = mongoose.Schema({
    username: {
      type:String,
      required:true,
      unique:true
    },
    first_name:{
      type:String
    },
    last_name:{
      type:String
    },
    email:{
      type:String,
      unique:true
    },
    mobile:{
      type:String,
      unique:true
    },
    salt: String,
    hash: String,
    password: String
});

userSchema.pre('save', function(next) {
  SecurityUtils.setPassword(this._doc, this._doc.password);
  delete this._doc.password;
  next();
});

module.exports = userSchema;
