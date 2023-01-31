const { Router } = require("express");
const { check } = require("express-validator");

const helpers = require("../utils/helpers");

const router = Router();

const rate_controller = require("../controllers/rateController");

router.post(
  "/addRate",
  //   [check("rating_date").notEmpty()],
  helpers.isAuthenticated,
  helpers.isAdmin,
  rate_controller.add_rate
);

module.exports = router;
