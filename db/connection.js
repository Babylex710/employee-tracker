const mysql = require("mysql2");
require("dotenv").config();


// Database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    database: "employee_tracker",
    password:"",
  },
  console.log("Connected to database.")
);

module.exports = db;