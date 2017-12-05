const serializers = require('./log-serializers/serializers');
const config = {
  name: "NPKS", //Node Project Kick Starter
  stream: process.stdout,
  serializers: {
      requestMax: serializers.requestMax,
      requestMin: serializers.requestMin,
      fnction: serializers.fnction
  },
  level : process.env.LOG_KICK_STARTER_LEVEL
};

module.exports = config;
