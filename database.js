const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "brad20thcentury",
  database: "db_inz",
});

module.exports = pool;
