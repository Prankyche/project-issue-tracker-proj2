const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.dbName
});

connection.connect((err) => {
    if (err) {
        console.error("MySQL Connection Failed: ", err);
    } else {
        console.log("Connected to MySQL Successfully");
    }
});

module.exports = connection;


