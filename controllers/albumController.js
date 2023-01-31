const { validationResult } = require("express-validator");
const dbManageAlbums = require("../db_queries/ManageAlbums");

add_album = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "title") {
    return res.status(400).send({ msg: "Title cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "release_date") {
    return res.status(400).send({ msg: "Release date cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "duration") {
    return res.status(400).send({ msg: "Duration cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "type_of_album") {
    return res.status(400).send({ msg: "Type of album cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "genre") {
    return res.status(400).send({ msg: "Genre cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "record_label") {
    return res.status(400).send({ msg: "Record label cannot be empty." });
  }

  if (req.fileValidationError) {
    return res.status(403).send({
      msg: "Only .png, .jpg and .jpeg format allowed and image must have less than 50kB!",
    });
  }

  try {
    const {
      title,
      release_date,
      duration,
      type_of_album,
      genre,
      record_label,
    } = req.body;
    const cover = req.file.filename;

    const album = await dbManageAlbums.addAlbum(
      title,
      cover,
      release_date,
      duration,
      type_of_album,
      genre,
      record_label
    );
    return res
      .status(201)
      .send({ msg: "Album have been created", idAlbum: album });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

assign_artist_to_album = async (req, res) => {
  const errors = validationResult(req);

  try {
    const { id_music_album, id_artist } = req.body;

    const assign = await dbManageAlbums.assignArtistToAlbum(id_music_album, id_artist);
    return res
      .status(201)
      .send({ msg: "Assign have been added" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

// get_text_by_id_text = async (req, res) => {
//   try {
//     const id_text = req.params.id_text;
//     const text = await dbManageTexts.getTextByIdText(id_text);
//     if (text === undefined) {
//       return res.sendStatus(404);
//     }
//     console.log(text);
//     return res.json(text);
//   } catch (e) {
//     console.log(e);
//     return res.sendStatus(500);
//   }
// };

module.exports = {
  add_album,
};
