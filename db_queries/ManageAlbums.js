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

db.editInfoAlbum = (
  id_music_album,
  title,
  release_date,
  duration,
  type_of_album,
  genre,
  record_label
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE music_albums SET title = ?, release_date = ?, duration = ?, type_of_album = ?, genre = ?, record_label =? WHERE id_music_album = ?",
      [
        title,
        release_date,
        duration,
        type_of_album,
        genre,
        record_label,
        id_music_album,
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getCoverAlbum = (id_music_album) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT cover FROM music_albums WHERE id_music_album = ?",
      [id_music_album],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.editCoverAlbum = (id_music_album, cover) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE music_albums SET cover = ? WHERE id_music_album = ?",
      [cover, id_music_album],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getAlbumById = (id_music_album) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM music_albums WHERE id_music_album = ?",
      [id_music_album],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getAllAlbums = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM music_albums", (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

db.getLastAlbums = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM music_albums ORDER BY id_music_album DESC",
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getCountOfAlbums = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT count(id_music_album) as amount FROM music_albums",
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getTop100ListOfAlbums = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(rates.numerical_rating) AS counts, AVG(rates.numerical_rating) AS mean, music_albums.* FROM rates, music_albums WHERE rates.music_album = music_albums.id_music_album AND rates.music_album IS NOT NULL GROUP BY rates.music_album ORDER BY mean DESC LIMIT 100",
      [],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.assignArtistToAlbum = (id_music_album, id_artist) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO position_albums (music_album, artist) VALUES (?,?)",
      [id_music_album, id_artist],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getArtistsByAlbumId = (id_music_album) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT artists.id_artist, artists.name FROM artists, position_albums WHERE artists.id_artist=position_albums.artist AND position_albums.music_album = ?",
      [id_music_album],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.deleteAssignArtist = (id_music_album, id_artist) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM position_albums WHERE music_album = ? AND artist = ?",
      [id_music_album, id_artist],
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
