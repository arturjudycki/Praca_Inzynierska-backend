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

db.addRateAlbum = (
  numerical_rating,
  verbal_rating,
  rating_date,
  favourites,
  music_album,
  user
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO rates (numerical_rating, verbal_rating, rating_date, favourites, music_album, user) VALUES (?,?,?,?,?,?)",
      [
        numerical_rating,
        verbal_rating,
        rating_date,
        favourites,
        music_album,
        user,
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

db.addRateSong = (
  numerical_rating,
  verbal_rating,
  rating_date,
  favourites,
  song,
  user
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO rates (numerical_rating, verbal_rating, rating_date, favourites, song, user) VALUES (?,?,?,?,?,?)",
      [numerical_rating, verbal_rating, rating_date, favourites, song, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

db.getRateAlbumByUser = (music_album, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE music_album = ? AND user = ?",
      [music_album, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getAllRatesAlbumsByUser = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?)",
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

db.getLengthOfRatesAlbumsByUserQuery = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT count(id_rate) AS counts FROM rates WHERE music_album IS NOT NULL AND user = (SELECT users.id_user FROM users WHERE username = ?)",
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

db.getAllRatesAlbumsByUserQuery = (
  username,
  sort_value,
  sort_order,
  limit,
  offset
) => {
  if (sort_value === "rating-date" && sort_order === "DESC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.type_of_album, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) ORDER BY rating_date DESC LIMIT ? OFFSET ?",
        [username, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "rating-date" && sort_order === "ASC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.type_of_album, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) ORDER BY rating_date ASC LIMIT ? OFFSET ?",
        [username, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "numerical-rating" && sort_order === "ASC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.type_of_album, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) ORDER BY numerical_rating ASC LIMIT ? OFFSET ?",
        [username, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "numerical-rating" && sort_order === "DESC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.type_of_album, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) ORDER BY numerical_rating DESC LIMIT ? OFFSET ?",
        [username, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  }
};

db.getLengthOfRatesAlbumsByUserQueryFilter = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT count(id_rate) AS counts FROM rates WHERE music_album IS NOT NULL AND favourites = 1 AND user = (SELECT users.id_user FROM users WHERE username = ?)",
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

db.getAllRatesAlbumsByUserQueryFilter = (
  username,
  favourite,
  sort_value,
  sort_order,
  limit,
  offset
) => {
  if (sort_value === "rating-date" && sort_order === "DESC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.type_of_album, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) AND favourites = ? ORDER BY rating_date DESC LIMIT ? OFFSET ?",
        [username, favourite, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "rating-date" && sort_order === "ASC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.type_of_album, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) AND favourites = ? ORDER BY rating_date ASC LIMIT ? OFFSET ?",
        [username, favourite, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "numerical-rating" && sort_order === "ASC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.type_of_album, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) AND favourites = ? ORDER BY numerical_rating ASC LIMIT ? OFFSET ?",
        [username, favourite, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "numerical-rating" && sort_order === "DESC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, music_albums.title, music_albums.cover, music_albums.type_of_album, music_albums.release_date, music_albums.id_music_album AS id FROM rates, music_albums WHERE music_album IS NOT NULL AND music_albums.id_music_album = rates.music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) AND favourites = ? ORDER BY numerical_rating DESC LIMIT ? OFFSET ?",
        [username, favourite, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  }
};

db.getRateSongByUser = (song, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE song = ? AND user = ?",
      [song, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getAllRatesSongsByUser = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.cover, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?)",
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

db.getLengthOfRatesSongsByUserQuery = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT count(id_rate) AS counts FROM rates WHERE song IS NOT NULL AND user = (SELECT users.id_user FROM users WHERE username = ?)",
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

db.getAllRatesSongsByUserQuery = (
  username,
  sort_value,
  sort_order,
  limit,
  offset
) => {
  if (sort_value === "rating-date" && sort_order === "DESC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.id_music_album AS id_ma, music_albums.cover, music_albums.title AS ma_title, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) ORDER BY rating_date DESC LIMIT ? OFFSET ?",
        [username, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "rating-date" && sort_order === "ASC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.id_music_album AS id_ma, music_albums.cover, music_albums.title AS ma_title, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) ORDER BY rating_date ASC LIMIT ? OFFSET ?",
        [username, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "numerical-rating" && sort_order === "ASC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.id_music_album AS id_ma, music_albums.cover, music_albums.title AS ma_title, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) ORDER BY numerical_rating ASC LIMIT ? OFFSET ?",
        [username, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "numerical-rating" && sort_order === "DESC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.id_music_album AS id_ma, music_albums.cover, music_albums.title AS ma_title, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) ORDER BY numerical_rating DESC LIMIT ? OFFSET ?",
        [username, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  }
};

db.getLengthOfRatesSongsByUserQueryFilter = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT count(id_rate) AS counts FROM rates WHERE song IS NOT NULL AND favourites = 1 AND user = (SELECT users.id_user FROM users WHERE username = ?)",
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

db.getAllRatesSongsByUserQueryFilter = (
  username,
  favourite,
  sort_value,
  sort_order,
  limit,
  offset
) => {
  if (sort_value === "rating-date" && sort_order === "DESC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.id_music_album AS id_ma, music_albums.cover, music_albums.title AS ma_title, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) AND favourites = ? ORDER BY rating_date DESC LIMIT ? OFFSET ?",
        [username, favourite, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "rating-date" && sort_order === "ASC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.id_music_album AS id_ma, music_albums.cover, music_albums.title AS ma_title, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) AND favourites = ? ORDER BY rating_date ASC LIMIT ? OFFSET ?",
        [username, favourite, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "numerical-rating" && sort_order === "ASC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.id_music_album AS id_ma, music_albums.cover, music_albums.title AS ma_title, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) AND favourites = ? ORDER BY numerical_rating ASC LIMIT ? OFFSET ?",
        [username, favourite, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  } else if (sort_value === "numerical-rating" && sort_order === "DESC") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT rates.*, songs.title, songs.id_song AS id, music_albums.id_music_album AS id_ma, music_albums.cover, music_albums.title AS ma_title, music_albums.release_date FROM rates, songs, music_albums WHERE song IS NOT NULL AND songs.id_song = rates.song AND songs.music_album = music_albums.id_music_album AND user = (SELECT users.id_user FROM users WHERE username = ?) AND favourites = ? ORDER BY numerical_rating DESC LIMIT ? OFFSET ?",
        [username, favourite, limit, offset],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  }
};

db.getStatisticsOfAlbum = (music_album) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(id_rate) AS quantity, AVG(numerical_rating) AS mean FROM rates WHERE music_album = ?",
      [music_album],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getStatisticsOfSong = (song) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(id_rate) AS quantity, AVG(numerical_rating) AS mean FROM rates WHERE song = ?",
      [song],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.getIdUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id_user FROM users WHERE username = ?",
      [username],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0].id_user);
      }
    );
  });
};

db.getStatisticsOfAllRatesByUser = (id_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT count(id_rate) AS num_rates, (SELECT count(favourites) FROM rates WHERE favourites = 1 AND user = ?) AS num_fav, (SELECT avg(numerical_rating) FROM rates WHERE user = ?) AS avg_rates, (SELECT count(music_album) FROM rates WHERE music_album IS NOT NULL AND user = ?) AS num_rates_ma, (SELECT count(favourites) FROM rates WHERE favourites = 1 AND music_album IS NOT NULL AND user = ?) AS num_fav_ma, (SELECT avg(numerical_rating) FROM rates WHERE music_album IS NOT NULL AND user = ?) AS avg_ma, (SELECT count(song) FROM rates WHERE song IS NOT NULL AND user = ?) AS num_rates_s, (SELECT count(favourites) FROM rates WHERE favourites = 1 AND song IS NOT NULL AND user = ?) AS num_fav_s, (SELECT avg(numerical_rating) FROM rates WHERE song IS NOT NULL AND user = ?) AS avg_s FROM rates WHERE user = ?",
      [
        id_user,
        id_user,
        id_user,
        id_user,
        id_user,
        id_user,
        id_user,
        id_user,
        id_user,
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

db.isAlbumRated = (music_album, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE music_album = ? AND user = ?",
      [music_album, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.isSongRated = (song, user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM rates WHERE song = ? AND user = ?",
      [song, user],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.editRate = (id_rate, numerical_rating, verbal_rating, favourites) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE rates SET numerical_rating = ?, verbal_rating = ?, favourites = ? WHERE id_rate = ?",
      [numerical_rating, verbal_rating, favourites, id_rate],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

db.deleteRate = (id_rate) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM rates WHERE id_rate = ?",
      [id_rate],
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
