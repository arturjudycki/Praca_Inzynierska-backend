const { Router } = require("express");
const { check } = require("express-validator");

const helpers = require("../utils/helpers");

const router = Router();

const rate_controller = require("../controllers/rateController");

router.post(
  "/addRateAlbum",
  helpers.isAuthenticated,
  rate_controller.add_rate_album
);

router.post(
  "/addRateSong",
  helpers.isAuthenticated,
  rate_controller.add_rate_song
);

router.get(
  "/:music_album/getRateAlbumByUser",
  // helpers.isAuthenticated,
  helpers.isAlbumRated,
  rate_controller.get_rate_album_by_user
);

router.get(
  "/:music_album/getStatisticsOfAlbum",
  rate_controller.get_statistics_of_album
);

router.get(
  "/:username/getAllRatesAlbumsByUser",
  rate_controller.get_all_rates_albums_by_user
);

router.get(
  "/:song/getRateSongByUser",
  helpers.isAuthenticated,
  helpers.isSongRated,
  rate_controller.get_rate_song_by_user
);

router.get(
  "/:song/getStatisticsOfSong",
  rate_controller.get_statistics_of_song
);

router.get(
  "/:username/getAllRatesSongsByUser",
  rate_controller.get_all_rates_songs_by_user
);

router.patch("/editRate", helpers.isAlbumRated, rate_controller.edit_rate);

router.delete("/deleteRate", helpers.isAlbumRated, rate_controller.delete_rate);

module.exports = router;
