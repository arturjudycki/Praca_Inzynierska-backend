const { Router } = require("express");
const { check } = require("express-validator");
const helpers = require("../utils/helpers");

const router = Router();

const text_controller = require("../controllers/textController");

router.post(
  "/createText",
  [
    check("type_of_text").notEmpty(),
    check("content").notEmpty(),
    check("publication_date").notEmpty(),
    check("user").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isEditorOrAdmin,
  text_controller.create_text
);

router.patch(
  "/updateText",
  [check("content").notEmpty(), check("id_text").notEmpty()],
  helpers.isAuthenticated,
  helpers.isEditorOrAdmin,
  text_controller.update_text
);

module.exports = router;
