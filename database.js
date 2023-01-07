const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "brad20thcentury",
  database: "db_inz",
});

let db = {};

db.usernameExist = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE users.username = ?",
      [username],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.emailExist = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE users.email = ?",
      [email],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.registerUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (username, email, password, user_type) VALUES (?,?,?,?)",
      [username, email, password, "regular_user"],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

module.exports = db;
