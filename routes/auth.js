const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const auth_controller = require("../controllers/authController");

router.post(
  "/register",
  [
    check("username").isLength({ min: 5, max: 20 }),
    check("email").normalizeEmail().isEmail(),
    check("password").matches(/^(?=.*?[a-z])(?=.*?[0-9]).{5,}$/),
    check("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error();
      }
      return true;
    }),
  ],
  auth_controller.register_post
);

// router.post("/login", auth_controller.login_post);

module.exports = router;
