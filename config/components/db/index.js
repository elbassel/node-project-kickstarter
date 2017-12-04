'use strict'

const dbConfig = require('./db');

const joi = require('joi');

console.log(dbConfig);

const dbConfigSchema = joi.object({
  "KICK_DB_NAME" :  joi.string()
    .required(),
  "KICK_DB_PORT" :  joi.number()
    .required(),
  "KICK_DB_HOST" :  joi.string()
    .required(),
  "KICK_DB_USERNAME" : joi.string(),

  "KICK_DB_PASSWORD" : joi.string(),
  "dbURL" : joi.string()
});

console.log(dbConfig.dbURL);

const { error, value: envVars } = joi.validate(dbConfig, dbConfigSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}


//Start mongoDB and mongoose connection
const mongoose = require('mongoose');

mongoose.connect(dbConfig.dbURL,{
  useMongoClient: true
});


const mongooseConnection = mongoose.connection;

mongooseConnection.on('error', console.error.bind(console, 'connection error:'));

mongooseConnection.once('open', function() {
  // we're connected!
  console.log("DB Server is running");
});

exports.mongooseConnection = mongoose.connection;
