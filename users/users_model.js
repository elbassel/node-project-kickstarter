const mongoose = require('mongoose');
const userSchema = require('./users_schema');
const UserModel = mongoose.model('users', userSchema);
var Promise = require("bluebird");


UserModel.insert = function(doctorObj){
  return new Promise(function(resolve,reject){
    var newDoctor = new UserModel(doctorObj);
      newDoctor.save(function(err,doctor){
        if(!err){
          resolve(doctor);
        }else{
          reject(err);
        }
    });
  })
};



module.exports = UserModel;
