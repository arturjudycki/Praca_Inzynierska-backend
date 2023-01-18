const db = require("../database");
const { hashPassword } = require("../utils/hashing");
const { validationResult } = require("express-validator");

user_logged = async (req, res) => {
  const id = req.session.user;
  const user = await db.getUser(id);
  return res.json({ user });
};

change_email = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "email") {
    return res
      .status(400)
      .send({ msg: "Invalid email address. Please enter an email." });
  }

  try {
    const { email } = req.body;
    const id = req.session.user;
    await db.changeEmail(email, id);
    return res.status(200).send({ msg: "Email have been changed" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

change_password = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "password") {
    return res.status(400).send({
      msg: "Password must have at least 8 characters, including letters and numbers.",
    });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "passwordConfirmation") {
    return res.status(400).send({ msg: "Passwords must be the same." });
  }

  try {
    const password = hashPassword(req.body.password);
    const id = req.session.user;
    await db.changePassword(password, id);
    return res.status(200).send({ msg: "Password have been changed" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  user_logged,
  change_email,
  change_password,
};
