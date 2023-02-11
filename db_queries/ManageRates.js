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

db.addRateAlbum = (
  numerical_rating,
  verbal_rating,
  rating_date,
  favourites,
  music_album,
  user
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO rates (numerical_rating, verbal_rating, rating_date, favourites, music_album, user) VALUES (?,?,?,?,?,?)",
      [
        numerical_rating,
        verbal_rating,
        rating_date,
        favourites,
        music_album,
        user,
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

db.addRateSong = (
  numerical_rating,
  verbal_rating,
  rating_date,
  favourites,
  song,
  user
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO rates (numerical_rating, verbal_rating, rating_date, favourites, song, user) VALUES (?,?,?,?,?,?)",
      [numerical_rating, verbal_rating, rating_date, favourites, song, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

db.deleteUser = (music_album, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE music_album = ? AND user ?",
      [music_album, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getRateAlbumOfUser = (music_album, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE music_album = ? AND user ?",
      [music_album, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getStatisticsOfAllbum = (music_album) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(id_rate) AS quantity, AVG(numerical_rating) AS mean FROM rates WHERE music_album = ?",
      [music_album],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getStatisticsOfSong = (song) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(id_rate) AS quantity, AVG(numerical_rating) AS mean FROM rates WHERE song = ?",
      [song],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.isAlbumRated = (music_album, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE music_album = ? AND user = ?",
      [music_album, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.isSongRated = (song, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE song = ? AND user = ?",
      [song, user],
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
