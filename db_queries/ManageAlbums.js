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

db.addAlbum = (
  title,
  cover,
  release_date,
  duration,
  type_of_album,
  genre,
  record_label
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO music_albums (title, cover, release_date, duration, type_of_album, genre, record_label) VALUES (?,?,?,?,?,?,?)",
      [
        title,
        cover,
        release_date,
        duration,
        type_of_album,
        genre,
        record_label,
      ],
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
