const { Router } = require("express");
const { check } = require("express-validator");
const helpers = require("../utils/helpers");
const user_controller = require("../controllers/userController");

const router = Router();

router.get("/loggedUser", helpers.isAuthenticated, user_controller.user_logged);
router.get(
  "/getEditorUsers",
  helpers.isAuthenticated,
  helpers.isAdmin,
  user_controller.get_editors
);
router.get("/:username", user_controller.user_data);

router.patch(
  "/grantAdmin",
  helpers.isAuthenticated,
  helpers.isAdmin,
  user_controller.grant_admin
);

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

router.post(
  "/createEditorAdmin",
  [
    check("username").isLength({ min: 5, max: 20 }),
    check("email").isEmail(),
    check("password").matches(/^(?=.*?[a-z,A-Z])(?=.*?[0-9]).{8,}$/),
    check("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error();
      }
      return true;
    }),
    check("first_name").notEmpty(),
    check("last_name").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isAdmin,
  user_controller.create_editor_admin
);



module.exports = router;
