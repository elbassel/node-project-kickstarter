const mongoose = require('mongoose');
const userSchema = require('./users_schema');
const UserModel = mongoose.model('users', userSchema);
var Promise = require("bluebird");


UserModel.insert = function(userObj){
  return new Promise(function(resolve,reject){
    var newDoctor = new UserModel(userObj);
      newDoctor.save(function(err,userObjCreated){
        if(!err){
          delete userObjCreated.hash;
          delete userObjCreated.salt;
          resolve(userObjCreated);
        }else{
          reject(err);
        }
    });
  })
};



module.exports = UserModel;
