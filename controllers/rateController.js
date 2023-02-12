const { validationResult } = require("express-validator");
const dbManageRates = require("../db_queries/ManageRates");

add_rate_album = async (req, res) => {
  try {
    const { numerical_rating, verbal_rating, favourites, music_album, user } =
      req.body;
    const rating_date = new Date(Date.now());

    const rate_album = await dbManageRates.addRateAlbum(
      numerical_rating,
      verbal_rating,
      rating_date,
      favourites,
      music_album,
      user
    );
    return res
      .status(201)
      .send({ msg: "Rate of album have been added", idRateAlbum: rate_album });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

add_rate_song = async (req, res) => {
  try {
    const { numerical_rating, verbal_rating, favourites, song, user } =
      req.body;
    const rating_date = new Date(Date.now());

    const rate_song = await dbManageRates.addRateSong(
      numerical_rating,
      verbal_rating,
      rating_date,
      favourites,
      song,
      user
    );
    return res
      .status(201)
      .send({ msg: "Rate of album have been added", idRateSong: rate_song });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_rate_album_by_user = async (req, res) => {
  try {
    const music_album = req.params.music_album;
    const user = req.session.user;

    const rate = await dbManageRates.getRateAlbumByUser(music_album, user);
    if (rate === undefined) {
      return res.sendStatus(404);
    }
    return res.json(rate);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_rates_albums_by_user = async (req, res) => {
  try {
    const username = req.params.username;

    const rates = await dbManageRates.getAllRatesAlbumsByUser(username);
    if (rates === undefined) {
      return res.sendStatus(404);
    }
    return res.json(rates);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_rate_song_by_user = async (req, res) => {
  try {
    const song = req.params.song;
    const user = req.session.user;

    const rate = await dbManageRates.getRateSongByUser(song, user);
    if (rate === undefined) {
      return res.sendStatus(404);
    }
    return res.json(rate);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_rates_songs_by_user = async (req, res) => {
  try {
    const username = req.params.username;

    const rates = await dbManageRates.getAllRatesSongsByUser(username);
    if (rates === undefined) {
      return res.sendStatus(404);
    }
    return res.json(rates);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_statistics_of_album = async (req, res) => {
  try {
    const music_album = req.params.music_album;

    const stats = await dbManageRates.getStatisticsOfAlbum(music_album);
    if (stats === undefined) {
      return res.sendStatus(404);
    }
    return res.json(stats);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_statistics_of_song = async (req, res) => {
  try {
    const song = req.params.song;

    const stats = await dbManageRates.getStatisticsOfSong(song);
    if (stats === undefined) {
      return res.sendStatus(404);
    }
    return res.json(stats);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

edit_rate = async (req, res) => {
  try {
    const { id_rate, numerical_rating, verbal_rating, favourites } = req.body;

    await dbManageRates.editRate(
      id_rate,
      numerical_rating,
      verbal_rating,
      favourites
    );
    return res.status(200).send({ msg: "Rate have been edited" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

delete_rate = async (req, res) => {
  try {
    const { id_rate } = req.body;

    await dbManageRates.deleteRate(id_rate);
    return res.status(200).send({ msg: "Rate have been deleted" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  add_rate_album,
  add_rate_song,
  get_rate_album_by_user,
  get_rate_song_by_user,
  get_all_rates_albums_by_user,
  get_all_rates_songs_by_user,
  get_statistics_of_song,
  get_statistics_of_album,
  edit_rate,
  delete_rate,
};
