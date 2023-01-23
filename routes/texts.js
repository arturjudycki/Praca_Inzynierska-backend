const { Router } = require("express");
const { check } = require("express-validator");
const helpers = require("../utils/helpers");

const router = Router();

const text_controller = require("../controllers/textController");

router.get(
  "/getTextsByIdUser",
  helpers.isAuthenticated,
  helpers.isEditorOrAdmin,
  text_controller.get_texts_by_id_user
);

router.get("/allTexts", text_controller.get_all_texts);

router.get("/article", text_controller.get_text_by_article);

router.get("/news", text_controller.get_text_by_news);

router.get("/ranking", text_controller.get_text_by_ranking);

router.get("/interview", text_controller.get_text_by_interview);

router.post(
  "/createText",
  [
    check("type_of_text").notEmpty(),
    check("title").notEmpty(),
    check("content").notEmpty(),
    check("user").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isEditorOrAdmin,
  text_controller.create_text
);

router.patch(
  "/updateText",
  [
    check("title").notEmpty(),
    check("content").notEmpty(),
    check("id_text").notEmpty(),
  ],
  helpers.isAuthenticated,
  helpers.isEditorOrAdmin,
  text_controller.update_text
);

router.get("/:id_text", text_controller.get_text_by_id_text);

module.exports = router;
