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

db.getRateAlbumByUser = (music_album, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE music_album = ? AND user = ?",
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

db.getAllRatesAlbumsByUser = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT rates.* FROM rates WHERE music_album IS NOT NULL AND user = (SELECT users.id_user FROM users WHERE username = ?)",
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

db.getRateSongByUser = (song, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE song = ? AND user = ?",
      [song, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getAllRatesSongsByUser = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT rates.* FROM rates WHERE song IS NOT NULL AND user = (SELECT users.id_user FROM users WHERE username = ?)",
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

db.editRate = (id_rate, numerical_rating, verbal_rating, favourites) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE rates SET numerical_rating = ?, verbal_rating = ?, favourites = ? WHERE id_rate = ?",
      [numerical_rating, verbal_rating, favourites, id_rate],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.deleteRate = (id_rate) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM rates WHERE id_rate = ?",
      [id_rate],
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
