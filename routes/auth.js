const { Router } = require("express");
const { check } = require("express-validator");
const helpers = require("../utils/helpers");

const router = Router();

const auth_controller = require("../controllers/authController");

router.post(
  "/register",
  [
    check("username").isLength({ min: 5, max: 20 }),
    check("email").isEmail(),
    check("password").matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    check("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error();
      }
      return true;
    }),
  ],
  auth_controller.register_post
);

router.post(
  "/login",
  [check("username").notEmpty(), check("password").notEmpty()],
  auth_controller.login_post
);

router.post("/logout", helpers.isAuthenticated, auth_controller.logout);

router.post(
  "/sendEmailLink",
  [check("email").notEmpty()],
  auth_controller.send_email_link
);

router.post(
  "/resetPassword",
  [
    check("password").matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    check("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error();
      }
      return true;
    }),
  ],
  helpers.validateResetToken,
  auth_controller.reset_password
);

module.exports = router;
