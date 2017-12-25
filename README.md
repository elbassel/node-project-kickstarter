# node-project-kickstarter
<span>
Node project kick starter is boiler plate project to get started developing your application quickly.<br/>
Main Technologies: Nodejs, Express, MongoDB, Mongoose, JWT, Passport, Node Mailer, DOTENV.<br/>
Don't bother your self by implementing Mongoose, Authentication,logs, Mailing,...<br/>
It's already implemented, just tune what you need in the project and get started quickly.<br/>
</span>
<br/><br/>
<span>
  All senstive information are excluded to be written in any file in the repository such as passwords, JWT key, etc.<br/>
  So, Dotenv package is used to handle it, create .env file under config folder and define it in the app file.
  <br/>
  <code>require('dotenv').config({path: './config/.env'})</code><br/>
  In .env file:<br/>
  <code>
  KICK_DB_NAME=tempDB
    </code>
    <br/>
<code>
KICK_DB_PORT=27017
  </code><br/>
<code>
KICK_DB_HOST=localhost
 </code><br/>
<code>
LOG_KICK_STARTER_LEVEL=info
  </code><br/>
<code>
MAIL_SUPPORT_PASSWORD=XXXXXX
 </code>
  <br/>
<code>
JWT_KEY=@ass!))98&&&?>*F*
  </code><br/>
<code>
SESSION_TIMEOUT=60<br/>
</code>
  </span>

<h3>Logs</h3>
<span>One of the most important component is to log some info to help you debugging your application.<br/>
  <a href="https://www.npmjs.com/package/pino">Pino</a> is one of the fastest logging tools.<br/>
  Three Serializers are implemented, you can find them in ./congi/components/logger/log-serializers folder:<br/>
  <ul>
  	<li>requestMax: to log the entire http request</li>
    <li>requestMin: to log some info from the request</li>
    <li>fnction: to log the function name</li>
  </ul>
  To use the looger component in your module:
  <code>const logger = require('../config/components').logger;</code><br/>
  You have to provide the "LOG_KICK_STARTER_LEVEL" in .env, in our project here it's <b>info</b>
  Samples of using the logger component:<br/>
  <code>logger.debug({path: __dirname, fnction: createUser, user : userObj}, "user created successfully");</code>
</span>

<br/>
<h3>Database (MongoDB and Mongoose)</h3>
<p>Mongoose is used as ODM.</p>
<p>Provide DB environment variables in .env file</p>
<code>
KICK_DB_NAME=tempDB<br/>
KICK_DB_PORT=27017<br/>
KICK_DB_HOST=localhost<br/>
</code>
<p>You can have a look on users schema in users/users_schema.js</p>

