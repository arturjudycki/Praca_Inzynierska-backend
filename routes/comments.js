const { Router } = require("express");
const { check } = require("express-validator");
const helpers = require("../utils/helpers");

const router = Router();

const comment_controller = require("../controllers/commentController");

router.post(
  "/addComment",
  [check("content_comment").notEmpty(), check("id_text").notEmpty()],
  helpers.isAuthenticated,
  comment_controller.add_comment
);

router.get("/:id_text/getComments", comment_controller.get_comments);

router.patch(
  "/editComment",
  [check("content_comment").notEmpty()],
  helpers.isAuthorOfComment,
  comment_controller.edit_comment
);

router.delete(
  "/deleteComment",
  helpers.isAuthenticated,
  helpers.isAuthorOfCommentOrAdmin,
  comment_controller.delete_comment
);

module.exports = router;
