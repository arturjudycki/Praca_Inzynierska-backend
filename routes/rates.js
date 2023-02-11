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
  "/:music_album/getRateAlbumOfUser",
  helpers.isAuthenticated,
  rate_controller.get_rate_album_of_user
);

router.get(
  "/:music_album/getStatisticsOfAlbum",
  rate_controller.get_statistics_of_album
);

router.get(
  "/:song/getStatisticsOfSong",
  rate_controller.get_statistics_of_song
);

module.exports = router;
