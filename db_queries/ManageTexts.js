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

db.createText = (type_of_text, title, content, publication_date, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO texts (type_of_text, title, content, publication_date, user) VALUES (?,?,?,?,?)",
      [type_of_text, title, content, publication_date, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.updateText = (content, id_text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE texts SET content = ? WHERE id_text = ?",
      [content, id_text],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

// db.getAllText;

db.getTextsByIdUser = (id_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM texts WHERE user = ?",
      [id_user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getTextByIdText = (id_text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM texts WHERE id_text = ?",
      [id_text],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getTextByTypeOfText = (type_of_text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM texts WHERE type_of_text = ?",
      [type_of_text],
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
