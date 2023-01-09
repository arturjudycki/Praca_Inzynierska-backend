const { hashPassword, comparePassword } = require("../utils/hashing");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const db = require("../database");

register_post = async (req, res) => {
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

  try {
    const { username, email } = req.body;
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
      const user = await db.registerUser(username, email, password);
      console.log(user);
      return res.status(201).send({ msg: "User have been created" });
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

login_post = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "username") {
    return res.status(400).send({ msg: "Username cannot be empty" });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "password") {
    return res.status(400).send({ msg: "Password cannot be empty" });
  }

  try {
    const { username } = req.body;
    const hashPassword = await db.getHashPassword(username);
    if (hashPassword.length === 1) {
      const hash = hashPassword[0].password;
      const correctPassword = comparePassword(req.body.password, hash);
      if (!correctPassword) {
        return res.status(400).send({ msg: "Invalid password" });
      } else {
        const user = await db.loginUser(username, hash);
        req.session.user = user.id_user;
        console.log(req.session);
        return res.status(200).send({ msg: "OK" });
      }
    } else {
      return res.status(400).send({ msg: "Invalid username" });
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.status(200).send({ msg: "Logout successful" });
    }
  });
};

async function sendPasswordResetEmail(email, resetToken, origin) {
  let message;

  const resetUrl = `${origin}/apiRouter/resetPassword?token=${resetToken} email=${email}`;
  message = `<p>Please click the below link to reset your password, the following link will be valid for only 1 hour:</p>
                     <p><a href="${resetUrl}">${resetUrl}</a></p>`;

  await sendEmail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: " Reset your Password",
    html: `<h4>Reset Password</h4>
                 ${message}`,
  });
}

sendEmailLink = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "email") {
    return res.status(400).send({ msg: "Email cannot be empty" });
  }

  try {
    const email = req.body.email;
    const origin = req.header("Origin");
    const isEmail = await db.emailExist(email);
    if (isEmail.length === 1) {
      return res
        .status(400)
        .send({ msg: "User with this username already exists" });
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
    const createdAt = new Date(Date.now());
    const expiredAt = resetTokenExpires;

    await db.insertResetToken(email, resetToken, createdAt, expiredAt, 0);

    await sendPasswordResetEmail(email, resetToken, origin);
    return res.json({ message: "Please check your email for a new password" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  register_post,
  login_post,
  logout,
};
