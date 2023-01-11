const db = require("../database");

reset_password = async (req, res) => {
  const id = req.session.user;
  const user = await db.getUser(id);
  return res.json({ user });
};

module.exports = {
  reset_password,
};
