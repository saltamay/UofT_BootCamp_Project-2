// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Require mysql
const mysql2 = require('mysql2');

// Set up our connection information

let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql2.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql2.createConnection({
    port: '3306',
    host: 'nba02whlntki5w2p.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'tc73jbdiqqesrb5w',
    password: 'eaysnxddxs48abp8',
    database: 'otr85dh0ggpmbqf6'
  });
}

// connection.connect();


// Connect to the database
connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

// Export connection
module.exports = connection;
