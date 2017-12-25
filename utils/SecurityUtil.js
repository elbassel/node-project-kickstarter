const jwt = require('jsonwebtoken');
const Promise = require('promise');
var crypto = require('crypto');
/**
  Decode jwt token and store the user object in req.user, if token is exist
*/
exports.decodeJWT = function(req, res, next){
  let authorization = req.headers.authorization;
  let token = authorization ? authorization.replace('Bearer ','') : null;
  if(token){
    exports.verifyToken(token).then((decoded)=>{

      req.user = decoded;

      res.setHeader('authorization', exports.generateJwt(decoded));

      next();

    },(err)=>{
      return res.status(401).json({success: false, message: 'Failed to authenticate token.', err: err});
    });
  }else{
    next();
  }

}

exports.verifyToken = function(token){
  return new Promise((resolve, reject)=>{
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (!err) {
        return resolve(decoded);
      }
      return reject(err);
    });
  });
};

exports.generateJwt = function(user) {
  var expiry = new Date();
  let signObj = user;

  //sessionTimeOut is in minutes
  const sessionTimeOut = parseInt(process.env.SESSION_TIMEOUT);
  signObj.exp = parseInt(expiry.getTime() / 1000) + 60 * sessionTimeOut;
  let token = jwt.sign(signObj, process.env.JWT_KEY);
  return token;
};

exports.generateJWTBasedOnTime = function(user, minutes){
  var expiry = new Date();
  let signObj = user;

  //sessionTimeOut is in minutes
  const timeout = parseInt(minutes);
  signObj.exp = parseInt(expiry.getTime() / 1000) + 60 * timeout;
  let token = jwt.sign(signObj, process.env.JWT_KEY);
  return token;
}

exports.setPassword = function(object, password){
  object.salt = crypto.randomBytes(16).toString('hex');
  object.hash = crypto.pbkdf2Sync(password, object.salt, 1000, 64, 'sha512').toString('hex');
  return object;
};

exports.validPassword = function(password, user) {
  var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  return user.hash === hash;
};
