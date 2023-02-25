const { validationResult } = require("express-validator");
const dbManageTexts = require("../db_queries/ManageTexts");

get_texts_by_id_user_search = async (req, res) => {
  try {
    const id_user = req.session.user;
    const texts = await dbManageTexts.getTextsByIdUserSearch(id_user);
    return res.json(texts);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_texts_by_id_user = async (req, res) => {
  try {
    let length;
    const limit = 5;
    let offset;
    let page_index;
    const page = req.query.page;
    if (page === undefined) {
      page_index = 1;
      offset = 0;
    } else {
      page_index = parseInt(req.query.page);
      offset = limit * (page_index - 1);
    }
    const id_user = req.session.user;
    const texts = await dbManageTexts.getTextsByIdUser(id_user, limit, offset);
    length = await dbManageTexts.getLengthOfTextsByIdUser(id_user);
    return res.json({ texts, length });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_text_by_id_text = async (req, res) => {
  try {
    const id_text = req.params.id_text;
    const text = await dbManageTexts.getTextByIdText(id_text);
    if (text === undefined) {
      return res.sendStatus(404);
    }
    console.log(text);
    return res.json(text);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

create_text = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === "type_of_text") {
    return res.status(400).send({ msg: "Type of text cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "title") {
    return res.status(400).send({ msg: "Title cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "content") {
    return res.status(400).send({ msg: "Content cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "user") {
    return res.status(400).send({ msg: "User cannot be empty." });
  }

  try {
    const { type_of_text, title, content, user } = req.body;
    const publication_date = new Date(Date.now());

    const text = await dbManageTexts.createText(
      type_of_text,
      title,
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

  if (!errors.isEmpty() && errors.errors[0].param === "title") {
    return res.status(400).send({ msg: "Title cannot be empty." });
  }
  if (!errors.isEmpty() && errors.errors[0].param === "content") {
    return res.status(400).send({ msg: "Content cannot be empty." });
  }

  try {
    const { title, content, id_text } = req.body;
    await dbManageTexts.updateText(title, content, id_text);
    return res.status(200).send({ msg: "Text have been updated" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_newest_texts = async (req, res) => {
  try {
    const texts = await dbManageTexts.getNewestTexts();
    return res.json(texts);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_texts = async (req, res) => {
  try {
    const type_of_text = req.query.type_of_text;
    const page = req.query.page;
    let texts;
    let length;

    const limit = 9;
    let page_index;
    let offset;

    if (page === undefined) {
      offset = 0;
    } else {
      page_index = parseInt(page);
      offset = limit * (page_index - 1);
    }

    if (type_of_text === undefined) {
      texts = await dbManageTexts.getAllTexts(limit, offset);
      length = await dbManageTexts.getLengthOfTexts();
      return res.json({ texts, length });
    } else {
      texts = await dbManageTexts.getTextsByTypeOfText(
        type_of_text,
        limit,
        offset
      );
      length = await dbManageTexts.getLengthOfTextsByTypeOfText(type_of_text);
      return res.json({ texts, length });
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  get_texts_by_id_user,
  get_texts_by_id_user_search,
  get_text_by_id_text,
  create_text,
  update_text,
  get_newest_texts,
  get_texts,
};
