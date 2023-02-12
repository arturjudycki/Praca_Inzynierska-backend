const db = require("../db_queries/AuthUser");
const dbManageComments = require("../db_queries/ManageComments");
const dbManageRates = require("../db_queries/ManageRates");

function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else return res.status(401).send({ msg: "You are not logged in" });
}

async function isAdmin(req, res, next) {
  const idUser = req.session.user;
  const userType = await db.getUserType(idUser);
  if (userType === "admin") next();
  else return res.status(403).send({ msg: "You are not admin user" });
}

async function isEditorOrAdmin(req, res, next) {
  const idUser = req.session.user;
  const userType = await db.getUserType(idUser);
  if (userType === "admin" || userType === "editor") next();
  else
    return res
      .status(403)
      .send({ msg: "You are not editor user or admin user" });
}

async function isAuthorOfComment(req, res, next) {
  const { id_comment } = req.body;
  const id_user = req.session.user;
  const user = await dbManageComments.authorOfTheComment(id_comment, id_user);
  if (user.length !== 0) next();
  else
    return res.status(403).send({ msg: "You are not author of that comment" });
}

async function isAlbumRated(req, res, next) {
  const music_album = req.params.music_album;
  const user = req.session.user;
  const rate = await dbManageRates.isAlbumRated(music_album, user);
  console.log(rate.length);

  if (rate.length !== 0) {
    next();
  } else {
    return res.status(403).send({ msg: "You did not rate that album" });
  }
}

async function isSongRated(req, res, next) {
  const song = req.params.song;
  const user = req.session.user;
  const rate = await dbManageRates.isSongRated(song, user);
  if (rate.length !== 0) next();
  else return res.status(403).send({ msg: "You did not rate that song" });
}

async function validateResetToken(req, res, next) {
  const email = req.body.email;
  const resetToken = req.body.token;
  if (!resetToken || !email) {
    return res.sendStatus(400);
  } // then we need to verify if the token exist in the resetPasswordToken and not expired.
  const currentTime = new Date(Date.now());
  const token = await db.findValidToken(resetToken, email, currentTime);
  if (!token) {
    res.json("Invalid token, please try again.");
  }
  next();
}

module.exports = {
  isAuthenticated,
  isAdmin,
  isEditorOrAdmin,
  isAuthorOfComment,
  validateResetToken,
  isAlbumRated,
  isSongRated,
};
