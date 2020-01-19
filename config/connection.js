// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Require mysql
const mysql2 = require('mysql2');

// Current env
const envString = process.env.NODE_ENV.toUpperCase();

// access the environment variables for this environment
const dbHost = process.env[`DB_HOST_${envString}`];
const dbUser = process.env[`DB_USER_${envString}`];
const dbPassword = process.env[`DB_PASSWORD_${envString}`];
const dbPort = process.env[`DB_PORT_${envString}`];
const dbDatabase = process.env[`DB_DATABASE_${envString}`];

// Set up our connection information
let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql2.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql2.createConnection({
    port: dbPort,
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase
  });
}

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(
    `Connected to ${process.env.NODE_ENV} database as id ${connection.threadId}`
  );
});

// Export connection
module.exports = connection;
