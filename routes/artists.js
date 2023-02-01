const { Router } = require("express");
const { check } = require("express-validator");

const helpers = require("../utils/helpers");

const router = Router();

const artist_controller = require("../controllers/artistController");

router.post(
  "/addArtist",
  [
    check("name").notEmpty(),
    check("description").notEmpty(),
    check("members").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isAdmin,
  artist_controller.add_artist
);

router.get("/getAllArtists", artist_controller.get_all_artists);

router.get(
  "/:id_artist/getArtistById",
  helpers.isAuthenticated,
  helpers.isAdmin,
  artist_controller.get_artist_by_id
);

module.exports = router;
