const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

let db = {};

db.registerEditorAdmin = (
  username,
  email,
  password,
  first_name,
  last_name,
  user_type
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (username, email, password, first_name, last_name, user_type) VALUES (?,?,?,?,?,?)",
      [username, email, password, first_name, last_name, user_type],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.grantAdmin = (id_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET user_type = ? WHERE id_user = ?",
      ["admin", id_user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getEditorUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id_user, username, first_name, last_name FROM users WHERE user_type = ?",
      ["editor"],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

module.exports = db;
