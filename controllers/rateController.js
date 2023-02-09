const { validationResult } = require("express-validator");
const dbManageRates = require("../db_queries/ManageRates");

add_rate_album = async (req, res) => {
  const errors = validationResult(req);

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
  const errors = validationResult(req);

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

module.exports = {
  add_rate_album,
  add_rate_song,
};
