const db = require("../db_queries/AuthUser");

function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else return res.status(401).send({ msg: "You are not logged in" });
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
  validateResetToken,
};
