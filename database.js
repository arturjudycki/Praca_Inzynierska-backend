const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "brad20thcentury",
  database: "db_inz",
});
