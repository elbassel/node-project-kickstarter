
const dbConfig = {
    "KICK_DB_NAME" : process.env.KICK_DB_NAME,
    "KICK_DB_PORT" : process.env.KICK_DB_PORT,
    "KICK_DB_HOST" : process.env.KICK_DB_HOST,
    "KICK_DB_USERNAME" : process.env.KICK_DB_USERNAME,
    "KICK_DB_PASSWORD" : process.env.KICK_DB_PASSWORD,
    get dbURL(){return "mongodb://" + this.KICK_DB_HOST + ":" + this.KICK_DB_PORT + "/" + this.KICK_DB_NAME}
};
module.exports = dbConfig;
