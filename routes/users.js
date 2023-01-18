const { Router } = require("express");
const db = require("../database");
const { check } = require("express-validator");
const helpers = require("../utils/helpers");
const user_controller = require("../controllers/userController");

const router = Router();

router.get("/loggedUser", helpers.isAuthenticated, user_controller.user_logged);
router.patch(
  "/changeEmail",
  [check("email").notEmpty()],
  helpers.isAuthenticated,
  user_controller.change_email
);
router.patch(
  "/changePassword",
  [
    check("password").matches(/^(?=.*?[a-z,A-Z])(?=.*?[0-9]).{8,}$/),
    check("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error();
      }
      return true;
    }),
  ],
  helpers.isAuthenticated,
  user_controller.change_password
);

module.exports = router;
