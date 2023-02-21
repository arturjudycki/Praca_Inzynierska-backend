const { validationResult } = require("express-validator");
const dbManageSongs = require("../db_queries/ManageSongs");

add_song = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "track_number") {
    return res.status(400).send({ msg: "Track number cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "title") {
    return res.status(400).send({ msg: "Title cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "duration") {
    return res.status(400).send({ msg: "Duration cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "id_artist") {
    return res.status(400).send({ msg: "Artist cannot be empty." });
  }

  try {
    const { track_number, title, duration, id_music_album, id_artist } =
      req.body;

    const song = await dbManageSongs.addSong(
      track_number,
      title,
      duration,
      id_music_album,
      id_artist
    );
    return res.status(201).send({ msg: "Song have been created" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_songs_of_album = async (req, res) => {
  try {
    const id_music_album = req.params.id_music_album;

    const songs = await dbManageSongs.getSongsOfAlbum(id_music_album);
    if (songs === undefined) {
      return res.sendStatus(404);
    }
    return res.json(songs);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_song = async (req, res) => {
  try {
    const id_song = req.params.id_song;

    const song = await dbManageSongs.getSong(id_song);
    if (song === undefined) {
      return res.sendStatus(404);
    }
    return res.json(song);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_songs = async (req, res) => {
  try {
    const songs = await dbManageSongs.getAllSongs();
    if (songs === undefined) {
      return res.sendStatus(404);
    }
    return res.json(songs);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_count_of_songs = async (req, res) => {
  try {
    const songs = await dbManageSongs.getCountOfSongs();
    if (songs === undefined) {
      return res.sendStatus(404);
    }
    return res.json(songs[0]);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

edit_song = async (req, res) => {
  try {
    const {
      id_song,
      track_number,
      title,
      duration,
      id_music_album,
      id_artist,
    } = req.body;

    await dbManageSongs.editSong(
      id_song,
      track_number,
      title,
      duration,
      id_music_album,
      id_artist
    );
    return res.status(200).send({ msg: "Song have been edited" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

delete_song = async (req, res) => {
  try {
    const { id_song } = req.body;

    await dbManageSongs.deleteSong(id_song);
    return res.status(200).send({ msg: "Song have been deleted" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  add_song,
  get_songs_of_album,
  get_song,
  get_all_songs,
  get_count_of_songs,
  edit_song,
  delete_song,
};
