const { Router } = require("express");
const db = require("../database");
const helpers = require("../utils/helpers");
const user_controller = require("../controllers/userController");

const router = Router();

router.get(
  "/loggedUser",
  helpers.isAuthenticated,
  user_controller.reset_password
);




module.exports = router;
