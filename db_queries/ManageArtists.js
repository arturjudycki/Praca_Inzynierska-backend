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

db.getArtistById = (id_artist) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM artists WHERE id_artist = ?",
      [id_artist],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getAllArtists = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM artists", (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

db.getAllArtistsOrderBy = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM artists ORDER BY name", (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

db.getCountOfArtists = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT count(id_artist) as amount FROM artists",
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.editArtist = (id_artist, name, description, members) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE artists SET name = ?, description = ?, members = ? WHERE id_artist = ?",
      [name, description, members, id_artist],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getAlbumsByArtistId = (id_artist) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT music_albums.* FROM music_albums, position_albums WHERE music_albums.id_music_album=position_albums.music_album AND position_albums.artist = ?",
      [id_artist],
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
