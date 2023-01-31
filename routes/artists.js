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

module.exports = router;
