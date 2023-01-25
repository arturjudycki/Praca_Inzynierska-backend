const db = require("../db_queries/AuthUser");

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
  const user = await db.authorOfTheComment(id_comment, id_user);
  console.log(user);
  // if (userType === "admin" || userType === "editor") next();
  // else
  //   return res.status(403).send({ msg: "You are not author of that comment" });
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
};
