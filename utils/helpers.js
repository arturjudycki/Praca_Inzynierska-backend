function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else return res.status(401).send({ msg: "You are not logged in" });
}

module.exports = {
  isAuthenticated,
};
