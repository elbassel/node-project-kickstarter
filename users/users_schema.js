var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
      type:String,
      required:true
    },
    first_name:{
      type:String
    },
    last_name:{
      type:String
    },
    email:{
      type:String
    },
    mobile:{
      type:String
    }
});

module.exports = userSchema;
