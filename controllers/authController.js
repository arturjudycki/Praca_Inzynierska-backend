const { hashPassword, comparePassword } = require("../utils/hashing");
const { validationResult } = require("express-validator");

register_post = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "username") {
    return res
      .status(400)
      .send({ msg: "Username must have at least 5 characters and fully 20" });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "email") {
    return res
      .status(400)
      .send({ msg: "Invalid email address. Please enter an email." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "password") {
    return res.status(400).send({
      msg: "Password must have at least 5 characters, including letters and numbers.",
    });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "passwordConfirmation") {
    return res.status(400).send({ msg: "Passwords must be the same." });
  }

  const { username, email } = req.body;
  const password = hashPassword(req.body.password);
  // insert do db
  res.status(201).send({ msg: "User have been created" });
};

login_post = (req, res) => {
  const { username, password } = request.body;
};

module.exports = {
  register_post,
};
