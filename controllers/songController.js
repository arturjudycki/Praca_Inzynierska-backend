const { validationResult } = require("express-validator");
const dbManageSongs = require("../db_queries/ManageSongs");

add_song = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "title") {
    return res.status(400).send({ msg: "Title cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "duration") {
    return res.status(400).send({ msg: "Duration cannot be empty." });
  }

  try {
    const { title, duration, id_music_album, id_artist } = req.body;

    const song = await dbManageSongs.addSong(
      title,
      duration,
      id_music_album,
      id_artist
    );
    return res.status(201).send({ msg: "Song have been created" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  add_song,
};
