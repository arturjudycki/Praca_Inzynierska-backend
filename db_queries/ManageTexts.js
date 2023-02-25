const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

let db = {};

db.createText = (type_of_text, title, content, publication_date, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO texts (type_of_text, title, content, publication_date, user) VALUES (?,?,?,?,?)",
      [type_of_text, title, content, publication_date, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.updateText = (title, content, id_text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE texts SET title = ?, content = ? WHERE id_text = ?",
      [title, content, id_text],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getTextByIdText = (id_text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT texts.*, users.first_name, users.last_name FROM texts, users WHERE id_text = ? AND texts.user = users.id_user",
      [id_text],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getNewestTexts = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM texts ORDER BY publication_date DESC LIMIT 6",
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getTextsByIdUserSearch = (id_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM texts WHERE user = ? ORDER BY publication_date DESC",
      [id_user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getTextsByIdUser = (id_user, limit, offset) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM texts WHERE user = ? ORDER BY publication_date DESC LIMIT ? OFFSET ?",
      [id_user, limit, offset],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getLengthOfTextsByIdUser = (id_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(id_text) AS counts FROM texts WHERE user = ?",
      [id_user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getTextsByTypeOfText = (type_of_text, limit, offset) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM texts WHERE type_of_text = ? ORDER BY publication_date DESC LIMIT ? OFFSET ?",
      [type_of_text, limit, offset],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getLengthOfTextsByTypeOfText = (type_of_text) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(id_text) AS counts FROM texts WHERE type_of_text = ?",
      [type_of_text],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getAllTexts = (limit, offset) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM texts ORDER BY publication_date DESC LIMIT ? OFFSET ?",
      [limit, offset],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.getLengthOfTexts = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(id_text) AS counts FROM texts",
      [],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

module.exports = db;
