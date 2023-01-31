const { validationResult } = require("express-validator");
const dbManageRates = require("../db_queries/ManageRates");

add_rate = async (req, res) => {
  const errors = validationResult(req);

  try {
    const {} = req.body;
    const rating_date = new Date(Date.now());

    const rate = await dbManageRates.addRate(rating_date);
    return res.status(201).send({ msg: "Rate have been added" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  add_rate,
};
