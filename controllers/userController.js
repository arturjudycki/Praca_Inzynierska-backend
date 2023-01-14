const db = require("../database");

user_logged = async (req, res) => {
  const id = req.session.user;
  const user = await db.getUser(id);
  return res.json({ user });
};

module.exports = {
  user_logged,
};
