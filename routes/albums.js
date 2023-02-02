const { Router } = require("express");
const { check, body } = require("express-validator");
const multer = require("multer");
const path = require("path");

const helpers = require("../utils/helpers");

const router = Router();

const album_controller = require("../controllers/albumController");

const storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const image_ext = path.extname(file.originalname);
    const fileSize = parseInt(req.headers["content-length"]);
    if (
      (image_ext == ".png" || image_ext == ".jpg" || image_ext == ".jpeg") &&
      (file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg") &&
      fileSize <= 51200
    ) {
      cb(null, true);
    } else {
      req.fileValidationError =
        "Only .png, .jpg and .jpeg format allowed and image must have less than 50kB!";
      return cb(null, false, req.fileValidationError);
    }
  },
});

router.post(
  "/addAlbum",
  upload.single("cover"),
  [
    body("title").notEmpty(),
    body("release_date").notEmpty(),
    body("duration").notEmpty(),
    body("type_of_album").notEmpty(),
    body("genre").notEmpty(),
    body("record_label").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isAdmin,
  album_controller.add_album
);

router.put(
  "/editAlbum",
  // upload.single("cover"),
  [
    check("title").notEmpty(),
    check("release_date").notEmpty(),
    check("duration").notEmpty(),
    check("type_of_album").notEmpty(),
    check("genre").notEmpty(),
    check("record_label").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isAdmin,
  album_controller.edit_album
);

router.get("/getAllAlbums", album_controller.get_all_albums);

router.get("/:id_music_album/getAlbumById", album_controller.get_album_by_id);

module.exports = router;
