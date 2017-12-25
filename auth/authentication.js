const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const logger = require('../config/components').logger;
var ejwt = require('express-jwt');

const SuccessMessage = require('../utils/customMessage').SuccessMessage;
const ErrorMessage = require('../utils/customMessage').ErrorMessage;

const SecurityUtil = require('../utils/SecurityUtil');

const passport = require('passport');


router.post('/login', function(req, res) {

  passport.authenticate('local', (err, user, info)=>{
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    refreshUserAuth(user, res, info);

  })(req, res);

});

// router.post('/authenticated', (req, res)=>{
//   const token = req.body.token;
//
//   if(token){
//     securtiyUtil.verifyToken(token).then((decodedUser)=>{
//       const newToken = securtiyUtil.generateJwt(decodedUser);
//       res.json({"token" : newToken});
//     },(err)=>{
//       return res.status(401).json({success: false, message: 'Failed to authenticate token.', err: err});
//     });
//   }else{
//     const errorMessage = new ErrorMessage(ErrorMessage.MISSING_PARAMETER, "token is missing");
//     res.status(401).send(errorMessage);
//   }
//
//
// });

// router.post('/forget-password', (req, res)=>{
//
//   const email = req.body.email;
//   const query = {"email" : email};
//
//   if(email){
//     ModelUtil.findByQuery(query).then((users)=>{
//       if(users){
//         const token = securtiyUtil.generateJWTBasedOnTime({email : email, hash : users[0].hash}, process.env.FORGET_PASSWORD_LINK);
//         let url = CONSTANTS.app_url + '/?token=' + token;
//         MailUtil.sendEmail(CONSTANTS.mail.forget_password, CONSTANTS.mailTemplates.forget_password, "Forget password link",{"user" : users[0], "url" : url}, CONSTANTS.language.en, email).then((info)=>{
//           let message = new Message(Message.EMAIL_SENT, null, messages.businessMessages.email_sent_success);
//           res.send(message);
//         }, (err)=>{
//           let errorMessage = new ErrorMessage(ErrorMessage.EMAIL_ERROR, err);
//           res.send(err);
//         });
//       }else{
//         let errorMessage = new ErrorMessage(ErrorMessage.OBJECT_NOT_FOUND, null);
//         res.json(errorMessage);
//       }
//     }, (err)=>{
//       res.send(err);
//     });
//   }else{
//     let errorMessage = new ErrorMessage(ErrorMessage.MISSING_PARAMETER, "email is missing");
//     res.send(errorMessage);
//   }
//
// });

// router.post('/reset-password', (req, res)=>{
//   const password = req.body.password;
//   const confirmPassword = req.body.confirmPassword;
//   if(password === confirmPassword){
//     const token = req.headers.authorization;
//     securtiyUtil.verifyToken(token).then((decodedUser)=>{
//       ModelUtil.findByQuery({email : decodedUser.email}).then((users)=>{
//         let user = users[0];
//         securtiyUtil.setPassword(user, password);
//         ModelUtil.updateDoc(user).then((result)=>{
//           let message = new Message(Message.RESET_PASSWORD, result, messages.businessMessages.resetـpassword_success);
//           res.json(message);
//         }, (err)=>{
//           let errorMessage = new ErrorMessage(ErrorMessage.DATABASE_ERROR, err);
//           res.status(500).send(err);
//         });
//       }, (err)=>{
//
//       });
//     },(err)=>{
//       let errorMessage = new ErrorMessage(ErrorMessage.AUTHENTICATION_ERROR, err);
//       res.status(401).send(errorMessage);
//     });
//   }else{
//     let errorMessage = new ErrorMessage(ErrorMessage.VALIDATION_ERROR, messages.errorMessages.match_confirm_password_error);
//     res.json(errorMessage);
//   }
// })

// router.get('/refresh-user', auth, (req, res)=>{
//   let authorization = req.headers.authorization;
//   let token = authorization ? authorization.replace('Bearer ','') : null;
//
//
//   securtiyUtil.verifyToken(token).then((decodedUser)=>{
//     ModelUtil.findById(decodedUser._id).then((user)=>{
//       refreshUserAuth(user, res, null);
//     }, (err)=>{
//       return utils.rejectMessage(ErrorMessage.DATABASE_ERROR,  err, 'refresh-user', reject);
//     });
//   },(err)=>{
//     let errorMessage = new ErrorMessage(ErrorMessage.AUTHENTICATION_ERROR, err);
//     res.status(401).send(errorMessage);
//   });
// });

// router.patch('/change-password', auth, (req, res)=>{
//   let oldPassword = req.body.oldPassword;
//   let password = req.body.password;
//   let confirmPassword = req.body.confirmPassword;
//   req.checkBody('oldPassword', 'oldPassword is mandatory').notEmpty();
//   req.checkBody('password', "password is mandatory").notEmpty();
//   req.checkBody('confirmPassword', "confirmPassword is mandatory").notEmpty();
//   if(password != confirmPassword){
//     let errorMessage = new ErrorMessage(ErrorMessage.VALIDATION_ERROR, messages.errorMessages.password_confirmpassword_match);
//     return res.status(400).send(errorMessage);
//   }
//
//   req.getValidationResult().then(function(result) {
//     if (!result.isEmpty()) {
//       let errorMessage = new ErrorMessage(ErrorMessage.VALIDATION_ERROR, result.array());
//       return res.status(400).send(errorMessage);
//
//     }
//
//     ModelUtil.findById(req.user._id).then((freshUser)=>{
//       //check old password
//       if(!securtiyUtil.validPassword(oldPassword, freshUser)){
//         let errorMessage = new ErrorMessage(ErrorMessage.VALIDATION_ERROR, messages.errorMessages.wrong_old_password);
//         return res.status(400).send(errorMessage);
//       }
//
//       securtiyUtil.setPassword(freshUser, password);
//       ModelUtil.updateDoc(freshUser).then((result)=>{
//         let message = new Message(Message.CHANGE_PASSWORD, result, messages.businessMessages.changeـpassword_success);
//         return res.json(message);
//       }, (err)=>{
//         let errorMessage = new ErrorMessage(ErrorMessage.DATABASE_ERROR, err);
//         res.status(500).send(err);
//       });
//
//     }, (err)=>{
//
//     });
//
//   });
//
// });

function refreshUserAuth(user, res, info){
  let token
  // If a user is found
  if(user){
    const minUser = {
      _id : user._id,
      username : user.username
    };
    token = SecurityUtil.generateJwt(minUser);
    res.status(200);

    delete user.hash;
    delete user.salt;

    res.json({
      "token" : token,
      "user" : user
    });
  } else {
    // If user is not found
    res.status(401).json(info);
  }
}


module.exports = router;
