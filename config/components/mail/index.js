const mails = require('./mails');
const joi = require('joi');

const mailConfigSchema = joi.object({
  "email" :  joi.string()
    .required(),
  "password" :  joi.string()
    .required(),
  "host" :  joi.string()
    .required(),
  "port" : joi.string()
});

//Can be repeated with every email validation.
let { error, value: envVars } = joi.validate(mails.SUPPORT.CONFIG, mailConfigSchema);

if (error) {
  throw new Error(`Support mail Config validation error: ${error.message}`)
}

module.exports = mails;
