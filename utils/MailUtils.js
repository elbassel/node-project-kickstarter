const nodemailer = require('nodemailer');
const EJS = require('ejs');
const logger = require('../config').components.logger;
const Promise = require('bluebird');
module.exports = {
    sendEmail
}


  function sendEmail(fromMailConfig, mailTemplate, subject, sentInfo, receivers){

   let supportTransporter = nodemailer.createTransport({
     host: fromMailConfig.host,
     port: fromMailConfig.port,
     secure: true, // secure:true for port 465, secure:false for port 587
     auth: {
         user: fromMailConfig.email,
         pass: fromMailConfig.password
     }
   });

   return new Promise((resolve, reject)=>{

     let path;

     path =   __dirname + "/mail-templates/" + mailTemplate + ".ejs";

     logger.info({file: __filename, fnction : sendEmail}, "Sending Email");

     send(supportTransporter,fromMailConfig.email , receivers, subject, path, sentInfo, resolve);

   });
 }


function send(transporter,email, receivers, subject, path, sentInfo, resolve){


  EJS.renderFile(path, sentInfo, {}, function(err, str){
  let mailOptions = {
          from: email, // sender address
          to: receivers, // list of receivers
          subject: subject, // Subject line
          html: str // html body
      };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error({file: __filename, fnction : send, err : error}, "Need an action to handle in case there is an error");
        }
        logger.info({file: __filename, fnction : send}, "Email has been sent successfully");
    });
    //Did that because no way to know if the email is sent successfully.
    resolve("In Progress sending");
  });

}
