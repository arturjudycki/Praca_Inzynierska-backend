const { validationResult } = require("express-validator");
const dbManageArtists = require("../db_queries/ManageArtists");

add_artist = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "name") {
    return res.status(400).send({ msg: "Name cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "description") {
    return res.status(400).send({ msg: "Description cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "members") {
    return res.status(400).send({ msg: "Members cannot be empty." });
  }

  try {
    const { name, description, members } = req.body;

    const artist = await dbManageArtists.addArtist(name, description, members);
    return res
      .status(201)
      .send({ msg: "Artist have been created", idArtist: artist });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_artist_by_id = async (req, res) => {
  try {
    const id_artist = req.params.id_artist;
    const artist = await dbManageArtists.getArtistById(id_artist);
    if (artist === undefined) {
      return res.sendStatus(404);
    }
    console.log(artist);
    return res.json(artist);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_artists = async (req, res) => {
  try {
    const artists = await dbManageArtists.getAllArtists();
    return res.json(artists);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  add_artist,
  get_artist_by_id,
  get_all_artists,
};
