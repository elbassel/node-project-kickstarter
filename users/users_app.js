const Promise = require('bluebird');
const logger = require('../config/components').logger;
const UserService = require('./users_service');



module.exports.createUser = createUser;
module.exports.getUserById = getUserById;



function createUser(userObj){
  return new Promise((resolve, reject)=>{
    logger.debug({path: __dirname, fnction: createUser, user : userObj}, "Creating user");
    UserService.createUser(userObj).then( userMessage =>{
      logger.debug({path: __dirname, fnction: createUser, user : userObj}, "user created successfully");
      resolve(userMessage);
    }).catch( errMsg =>{
      logger.error({path: __dirname, fnction: createUser, user : userObj, error: errMsg}, "creating user error");
      reject(errMsg);
    });
  });
}

function getUserById(userId){
  return new Promise((resolve, reject)=>{
    UserService.getUserById(userId)
      .then(userMsg=> resolve(userMsg))
      .catch(errMsg=> reject(errMsg));
  });
}
