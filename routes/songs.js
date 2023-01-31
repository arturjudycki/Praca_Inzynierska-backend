const { Router } = require("express");
const { check } = require("express-validator");

const helpers = require("../utils/helpers");

const router = Router();

const song_controller = require("../controllers/songController");

router.post(
  "/addSong",
  [check("title").notEmpty(), check("duration").notEmpty()],
  helpers.isAuthenticated,
  helpers.isAdmin,
  song_controller.add_song
);

module.exports = router;
