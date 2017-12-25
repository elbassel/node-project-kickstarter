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
  <br/><br/>
  <code>require('dotenv').config({path: './config/.env'})</code>
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
