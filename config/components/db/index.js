'use strict'

const logger = require('../logger');

const dbConfig = require('./db');

const joi = require('joi');

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

mongooseConnection.on('error', (err)=>{
  console.error.bind(console, 'connection error:');
  console.log(err);
  throw new Error(`connection error`);
});

mongooseConnection.once('open', function() {
  // we're connected!
  logger.info("DB Server is running");
});


// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
  throw new Error(`Database server is down`);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

exports.mongooseConnection = mongoose.connection;
