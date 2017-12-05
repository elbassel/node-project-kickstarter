const logConfig = require('./logger');
const joi = require('joi');
const logConfigSchema = joi.object({
  "name" :  joi.string()
    .required(),
  "stream" :  joi.required(),
  "serializers" :  joi.required(),
  "level" : joi.string().required()
});

const { error, value: envVars } = joi.validate(logConfig, logConfigSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}


const pino = require('pino')(logConfig);

module.exports = pino;
