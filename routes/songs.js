const { Router } = require("express");
const { check } = require("express-validator");

const helpers = require("../utils/helpers");

const router = Router();

const song_controller = require("../controllers/songController");

router.post(
  "/addSong",
  [
    check("track_number").notEmpty(),
    check("title").notEmpty(),
    check("duration").notEmpty(),
    check("id_artist").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isAdmin,
  song_controller.add_song
);

router.get("/getAllSongs", song_controller.get_all_songs);

router.get("/getCountOfSongs", song_controller.get_count_of_songs);

router.get("/getTop100ListOfSongs", song_controller.get_top_100_list_of_songs);

router.get("/:id_song/getSong", song_controller.get_song);

router.get(
  "/:id_music_album/getSongsOfAlbum",
  song_controller.get_songs_of_album
);

router.put(
  "/editSong",
  [
    check("track_number").notEmpty(),
    check("title").notEmpty(),
    check("duration").notEmpty(),
    check("id_artist").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isAdmin,
  song_controller.edit_song
);

router.delete(
  "/deleteSong",
  helpers.isAuthenticated,
  helpers.isAdmin,
  song_controller.delete_song
);

module.exports = router;
