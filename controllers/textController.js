const db = require("../db_queries/AuthUser");

get_texts = async (req, res) => {};

create_text = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "type_of_text") {
    return res.status(400).send({ msg: "Type of text cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "content") {
    return res.status(400).send({ msg: "Content cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "publication_date") {
    return res.status(400).send({ msg: "Publication date cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "user") {
    return res.status(400).send({ msg: "User cannot be empty." });
  }

  try {
    const { type_of_text, content, publication_date, user } = req.body;
    const text = await dbManageTexts.createText(
      type_of_text,
      content,
      publication_date,
      user
    );
    return res.status(201).send({ msg: "Text have been created" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

update_text = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "content") {
    return res.status(400).send({ msg: "Content cannot be empty." });
  }

  try {
    const { content, id_text } = req.body;
    await dbManageTexts.updateText(content, id_text);
    return res.status(200).send({ msg: "Text have been updated" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  get_texts,
  create_text,
  update_text,
};
