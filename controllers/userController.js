const db = require("../db_queries/AuthUser");
const dbManageUsers = require("../db_queries/ManageUsers");

const { hashPassword } = require("../utils/hashing");
const { validationResult } = require("express-validator");

user_logged = async (req, res) => {
  const id = req.session.user;
  const user = await db.getUser(id);
  return res.json({ user });
};

user_data = async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username);
    const user = await db.getUserByUsername(username);
    console.log(user);
    if (user === undefined) {
      return res.sendStatus(404);
    }
    return res.json({ user });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

// get_user_data_by_id = async (req, res) => {
//   try {
//     const username = req.params.username;
//     console.log(username);
//     const user = await db.getUser(id_user);
//     console.log(user);
//     if (user === undefined) {
//       return res.sendStatus(404);
//     }
//     return res.json({ user });
//   } catch (e) {
//     console.log(e);
//     return res.sendStatus(500);
//   }
// };

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

create_editor_admin = async (req, res) => {
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
      msg: "Password must have at least 8 characters, including letters and numbers.",
    });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "passwordConfirmation") {
    return res.status(400).send({ msg: "Passwords must be the same." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "first_name") {
    return res.status(400).send({ msg: "First_name cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "last_name") {
    return res.status(400).send({ msg: "Last_name cannot be empty." });
  }

  try {
    const { username, email, first_name, last_name, user_type } = req.body;
    const password = hashPassword(req.body.password);
    const isUsername = await db.usernameExist(username);
    const isEmail = await db.emailExist(email);
    if (isUsername.length === 1) {
      return res
        .status(400)
        .send({ msg: "User with this username already exists" });
    } else if (isEmail.length === 1) {
      return res
        .status(400)
        .send({ msg: "User with this email already exists" });
    } else {
      const user = await dbManageUsers.registerEditorAdmin(
        username,
        email,
        password,
        first_name,
        last_name,
        user_type
      );
      return res.status(201).send({ msg: "User have been created" });
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_editors = async (req, res) => {
  try {
    const editors = await dbManageUsers.getEditorUsers();
    console.log(editors);
    if (editors === undefined) {
      return res.sendStatus(404);
    }
    return res.json({ editors });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

grant_admin = async (req, res) => {
  try {
    const id = req.body.id_user;
    await dbManageUsers.grantAdmin(id);
    return res.status(200).send({ msg: "Role Admin have been granted" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  user_logged,
  user_data,
  change_email,
  change_password,
  create_editor_admin,
  get_editors,
  grant_admin,
};