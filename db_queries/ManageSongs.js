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

db.addSong = (title, duration, id_music_album, id_artist) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO songs (title, duration, music_album, artist) VALUES (?,?,?,?)",
      [title, duration, id_music_album, id_artist],
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
