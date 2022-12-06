const mysql = require("mysql2");
require("dotenv").config();


// Database
const db = mysql.createConnection(
  {
    host: "localhost",
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    user: "root",
    database: "employee_tracker",
    password:"",
  },
  console.log("Connected to database.")
);

module.exports = db;