const { hashPassword, comparePassword } = require("../utils/hashing");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");

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
      msg: "Password must have at least 8 characters, including letters and numbers.",
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

async function sendEmail({ from, to, subject, html }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });
  await transporter.sendMail({ from, to, subject, html });
  console.log("email sent sucessfully");
}

async function sendPasswordResetEmail(email, resetToken, origin) {
  let message;

  const resetUrl = `${origin}/reset-password/${resetToken}/${email}`;
  message = `<p>Kliknij w poniższy link, aby zresetować hasło. Link będzie aktywny przez godzinę.</p>
                     <p><a href="${resetUrl}">${resetUrl}</a></p>`;

  await sendEmail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Zmiana hasła",
    html: `<h4>Zmiana hasła</h4>
                 ${message}`,
  });
}

send_email_link = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "email") {
    return res.status(400).send({ msg: "Email cannot be empty" });
  }

  try {
    const email = req.body.email;
    const origin = "http://localhost:3000";
    const isEmail = await db.emailExist(email);
    if (isEmail.length === 0) {
      return res
        .status(400)
        .send({ msg: "User with this email doesn't exist" });
    }
    await db.expireOldTokens(email, 1);

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

reset_password = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "password") {
    return res.status(400).send({
      msg: "Password must have at least 5 characters, including letters and numbers.",
    });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "passwordConfirmation") {
    return res.status(400).send({ msg: "Passwords must be the same." });
  }

  try {
    const password = hashPassword(req.body.password);
    const email = req.body.email;
    const user = await db.emailExist(email);
    await db.updateUserPassword(password, user[0].id_user);
    res.json({
      message:
        "Password reset successful, you can now login with the new password",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  register_post,
  login_post,
  logout,
  send_email_link,
  reset_password,
};
