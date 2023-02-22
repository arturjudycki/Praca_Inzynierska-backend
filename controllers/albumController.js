const { validationResult } = require("express-validator");
const dbManageAlbums = require("../db_queries/ManageAlbums");
const fs = require("fs");
const path = require("path");

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

edit_info_album = async (req, res) => {
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

  try {
    const {
      id_music_album,
      title,
      release_date,
      duration,
      type_of_album,
      genre,
      record_label,
    } = req.body;

    await dbManageAlbums.editInfoAlbum(
      id_music_album,
      title,
      release_date,
      duration,
      type_of_album,
      genre,
      record_label
    );
    return res.status(200).send({ msg: "Album have been edited" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

edit_cover_album = async (req, res) => {
  if (req.fileValidationError) {
    return res.status(403).send({
      msg: "Only .png, .jpg and .jpeg format allowed and image must have less than 50kB!",
    });
  }

  try {
    const { id_music_album } = req.body;
    const cover = req.file.filename;

    const oldPhoto = await dbManageAlbums.getCoverAlbum(id_music_album);
    console.log(oldPhoto);
    if (oldPhoto.cover) {
      const oldPath = path.join(__dirname, "..", "images", oldPhoto.cover);
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          // res.status(200).send(userObj);
        });
      }
    }
    await dbManageAlbums.editCoverAlbum(id_music_album, cover);
    return res.status(200).send({ msg: "Cover of album have been edited" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_album_by_id = async (req, res) => {
  try {
    const id_music_album = req.params.id_music_album;
    const album = await dbManageAlbums.getAlbumById(id_music_album);
    if (album === undefined) {
      return res.sendStatus(404);
    }
    console.log(album);
    return res.json(album);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_albums = async (req, res) => {
  try {
    const albums = await dbManageAlbums.getAllAlbums();
    return res.json(albums);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_last_albums = async (req, res) => {
  try {
    const albums = await dbManageAlbums.getLastAlbums();
    return res.json(albums);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_count_of_albums = async (req, res) => {
  try {
    const albums = await dbManageAlbums.getCountOfAlbums();
    return res.json(albums[0]);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_top_100_list_of_albums = async (req, res) => {
  try {

    let albums;
    let typeOfAlbum = req.query.typeOfAlbum;
    let releaseDate = req.query.releaseDate;
    let beginDate;
    let endDate;

    if (releaseDate !== undefined) {
      switch (releaseDate) {
        case "1950":
          beginDate = "1950-01-01";
          endDate = "1959-12-31";
          break;
        case "1960":
          beginDate = "1960-01-01";
          endDate = "1969-12-31";
          break;
        case "1970":
          beginDate = "1970-01-01";
          endDate = "1979-12-31";
          break;
        case "1980":
          beginDate = "1980-01-01";
          endDate = "1989-12-31";
          break;
        case "1990":
          beginDate = "1990-01-01";
          endDate = "1999-12-31";
          break;
        case "2000":
          beginDate = "2000-01-01";
          endDate = "2009-12-31";
          break;
        case "2010":
          beginDate = "2010-01-01";
          endDate = "2019-12-31";
          break;
        case "2020":
          beginDate = "2020-01-01";
          endDate = "2029-12-31";
          break;
      }
    }

    if (typeOfAlbum === undefined && releaseDate === undefined) {
      albums = await dbManageAlbums.getTop100ListOfAlbums();
    } else if (typeOfAlbum !== undefined && releaseDate === undefined) {
      albums = await dbManageAlbums.getTop100ListOfAlbumsFilterType(
        typeOfAlbum
      );
    } else if (typeOfAlbum === undefined && releaseDate !== undefined) {
      albums = await dbManageAlbums.getTop100ListOfAlbumsFilterRelease(
        beginDate,
        endDate
      );
    } else if (typeOfAlbum !== undefined && releaseDate !== undefined) {
      albums = await dbManageAlbums.getTop100ListOfAlbumsFilterTypeRelease(
        typeOfAlbum,
        beginDate,
        endDate
      );
    }

    if (albums === undefined) {
      return res.sendStatus(404);
    }
    return res.json(albums);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

assign_artist_to_album = async (req, res) => {
  try {
    const { id_music_album, id_artist } = req.body;

    await dbManageAlbums.assignArtistToAlbum(id_music_album, id_artist);
    return res.status(201).send({ msg: "Assign have been added" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

delete_assign_artist = async (req, res) => {
  try {
    const { id_music_album, id_artist } = req.body;

    await dbManageAlbums.deleteAssignArtist(id_music_album, id_artist);
    return res.status(200).send({ msg: "Assign have been deleted" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_artists_by_album_id = async (req, res) => {
  try {
    const id_music_album = req.params.id_music_album;
    const artists = await dbManageAlbums.getArtistsByAlbumId(id_music_album);
    if (artists === undefined) {
      return res.sendStatus(404);
    }
    console.log(artists);
    return res.json(artists);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  add_album,
  edit_info_album,
  edit_cover_album,
  get_album_by_id,
  get_all_albums,
  get_last_albums,
  get_count_of_albums,
  get_top_100_list_of_albums,
  assign_artist_to_album,
  get_artists_by_album_id,
  // get_assign_artists,
  delete_assign_artist,
};
