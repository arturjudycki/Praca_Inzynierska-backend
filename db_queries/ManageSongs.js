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

db.addSong = (track_number, title, duration, id_music_album, id_artist) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO songs (track_number, title, duration, music_album, artist) VALUES (?,?,?,?,?)",
      [track_number, title, duration, id_music_album, id_artist],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getSongsOfAlbum = (id_music_album) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT songs.*, artists.name FROM songs, artists WHERE songs.artist = artists.id_artist AND songs.music_album = ?",
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

db.getSong = (id_song) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT songs.*, artists.name, music_albums.title AS album_title, music_albums.cover FROM songs, artists, music_albums WHERE songs.artist = artists.id_artist AND songs.music_album = music_albums.id_music_album AND songs.id_song = ?",
      [id_song],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getAllSongs = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT songs.*, artists.name, music_albums.cover FROM songs, artists, music_albums WHERE songs.artist = artists.id_artist AND songs.music_album = music_albums.id_music_album",
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

db.editSong = (
  id_song,
  track_number,
  title,
  duration,
  id_music_album,
  id_artist
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE songs SET track_number = ?, title = ?, duration = ?, music_album = ?, artist = ? WHERE id_song = ?",
      [track_number, title, duration, id_music_album, id_artist, id_song],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.deleteSong = (id_song) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM songs WHERE id_song = ?",
      [id_song],
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
