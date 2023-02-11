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

get_rate_album_of_user = async (req, res) => {
  try {
    const music_album = req.params.music_album;
    const user = req.session.user;

    const rate = await dbManageRates.getRateAlbumOfUser(music_album, user);
    if (rate === undefined) {
      return res.sendStatus(404);
    }
    return res.json(rate);
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

module.exports = {
  add_rate_album,
  add_rate_song,
  get_rate_album_of_user,
  get_statistics_of_song,
  get_statistics_of_album,
};
