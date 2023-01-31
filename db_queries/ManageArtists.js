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

db.addArtist = (name, description, members) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO artists (name, description, members) VALUES (?,?,?)",
      [name, description, members],
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
