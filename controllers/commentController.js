const { validationResult } = require("express-validator");
const dbManageComments = require("../db_queries/ManageComments");

add_comment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "content_comment") {
    return res.status(400).send({ msg: "Content comment cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "id_user") {
    return res.status(400).send({ msg: "User cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "id_text") {
    return res.status(400).send({ msg: "Text cannot be empty." });
  }

  try {
    const { content_comment, id_user, id_text } = req.body;
    const publication_date = new Date(Date.now());

    const comment = await dbManageComments.addComment(
      content_comment,
      publication_date,
      id_user,
      id_text
    );
    return res.status(201).send({ msg: "Comment have been created" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_comments = async (req, res) => {
  try {
    const { id_text } = req.params.id_text;

    const comments = await dbManageComments.deleteComment(id_text);
    console.log(comments);
    return res.json(comments);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

edit_comment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "content_comment") {
    return res.status(400).send({ msg: "Content of comment cannot be empty." });
  }

  try {
    const { content_comment, id_comment } = req.body;

    const comment = await dbManageComments.editComment(
      content_comment,
      id_comment
    );
    return res.status(200).send({ msg: "Comment have been edited" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

delete_comment = async (req, res) => {
  const errors = validationResult(req);

  try {
    const { id_comment } = req.body;

    const comment = await dbManageComments.deleteComment(id_comment);
    return res.status(200).send({ msg: "Comment have been deleted" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  add_comment,
  get_comments,
  edit_comment,
  delete_comment,
};
