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

db.addComment = (content_comment, publication_date, id_user, id_text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO comments (content_comment, publication_date, user, text) VALUES (?,?,?,?)",
      [content_comment, publication_date, id_user, id_text],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getComments = (id_text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT comments.*, users.username FROM comments, users WHERE comments.user = users.id_user AND comments.text = ?",
      [id_text],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.editComment = (content_comment, id_comment) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE comments SET content_comment = ?, edited = ? WHERE id_comment = ?",
      [content_comment, 1, id_comment],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.deleteComment = (id_comment) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM comments WHERE id_comment = ?",
      [id_comment],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.authorOfTheComment = (id_comment, id_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM comments WHERE id_comment = ? AND user = ?",
      [id_comment, id_user],
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
