const UserModel = require('./users_model');
const Promise = require('bluebird');
const logger = require('../config/components').logger;
const SuccessMessage = require('../utils/customMessage').SuccessMessage;
const ErrorMessage = require('../utils/customMessage').ErrorMessage;

module.exports.createUser = createUser;
module.exports.getUserById = getUserById;



function createUser(userObj){
  return new Promise((resolve, reject)=>{
    logger.debug({fnction: createUser, user : userObj}, "Creating user");
    UserModel.insert(userObj).then( newUser =>{
      let message = new SuccessMessage(SuccessMessage.CREATING_OBJECT_SUCCESS, newUser);
      logger.debug({path: __dirname, fnction: createUser, user : userObj}, "user created successfully");
      resolve(message);
    }).catch( (err) =>{
      let errorMessage = new ErrorMessage(ErrorMessage.CREATING_OBJECT_ERROR, err);
      logger.error({path: __dirname, fnction: createUser, user : userObj, error: err}, "creating user error");
      reject(errorMessage);
    });
  });
}

function getUserById(userId){
  return new Promise((resolve, reject)=>{
    UserModel.findById(userId, (err, userDoc)=>{
      if(!err && userDoc){
        let message = new SuccessMessage(SuccessMessage.GETTING_DATA, userDoc);
        logger.debug({path: __dirname, fnction: getUserById, id: userId, user : userDoc}, "get User  by id");
        resolve(message);
      }else if(!err){
        let errorMessage = new ErrorMessage(ErrorMessage.OBJECT_NOT_FOUND, null);
        logger.error({path: __dirname, fnction: getUserById, userId : userId}, "object not found");
        reject(errorMessage);
      }else{
        let errorMessage = new ErrorMessage(ErrorMessage.DATABASE_ERROR, err);
        logger.error({path: __dirname, fnction: getUserById, error: err}, "database error");
        reject(errorMessage);
      }

    })
  });
}
