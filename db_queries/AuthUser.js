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

db.usernameExist = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE users.username = ?",
      [username],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.emailExist = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE users.email = ?",
      [email],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.registerUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (username, email, password, user_type) VALUES (?,?,?,?)",
      [username, email, password, "regular_user"],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

db.getHashPassword = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT password FROM users WHERE username = ?",
      [username],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.user_type = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT user_type FROM users WHERE username = ?",
      [username],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.insertResetToken = (email, tokenValue, createdAt, expiredAt, used) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO ResetPasswordToken ( email, Token_value, created_at, expired_at, used) VALUES (?, ?,?, ?, ?)",
      [email, tokenValue, createdAt, expiredAt, used],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

db.expireOldTokens = (email, used) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE ResetPasswordToken SET used = ?  WHERE email = ?",
      [used, email],
      (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

db.findValidToken = (token, email, currentTime) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM ResetPasswordToken WHERE (email = ? AND Token_value = ? AND expired_at > ?)",
      [email, token, currentTime],
      (error, tokens) => {
        if (error) {
          return reject(error);
        }
        return resolve(tokens[0]);
      }
    );
  });
};

db.updateUserPassword = (password, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET password = ? WHERE id_user = ?",
      [password, id],
      (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

db.getUser = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT username, email, first_name, last_name, user_type from users WHERE id_user = ?",
      [id],
      (error, user) => {
        if (error) {
          return reject(error);
        }
        return resolve(user[0]);
      }
    );
  });
};

db.getUserType = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT user_type from users WHERE id_user = ?",
      [id],
      (error, user) => {
        if (error) {
          return reject(error);
        }
        return resolve(user[0].user_type);
      }
    );
  });
};

db.getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT username, email, first_name, last_name, user_type from users WHERE username = ?",
      [username],
      (error, user) => {
        if (error) {
          return reject(error);
        }
        return resolve(user[0]);
      }
    );
  });
};

db.changeEmail = (email, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET email = ? WHERE id_user = ?",
      [email, id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.changePassword = (password, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET password = ? WHERE id_user = ?",
      [password, id],
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
