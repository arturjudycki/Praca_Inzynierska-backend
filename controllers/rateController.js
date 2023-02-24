const { validationResult } = require("express-validator");
const dbManageRates = require("../db_queries/ManageRates");

add_rate_album = async (req, res) => {
  try {
    const { numerical_rating, verbal_rating, favourites, music_album, user } =
      req.body;
    const rating_date = new Date(Date.now());

    const rate_album = await dbManageRates.addRateAlbum(
      numerical_rating,
      verbal_rating,
      rating_date,
      favourites,
      music_album,
      user
    );
    return res
      .status(201)
      .send({ msg: "Rate of album have been added", idRateAlbum: rate_album });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

add_rate_song = async (req, res) => {
  try {
    const { numerical_rating, verbal_rating, favourites, song, user } =
      req.body;
    const rating_date = new Date(Date.now());

    const rate_song = await dbManageRates.addRateSong(
      numerical_rating,
      verbal_rating,
      rating_date,
      favourites,
      song,
      user
    );
    return res
      .status(201)
      .send({ msg: "Rate of album have been added", idRateSong: rate_song });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_rate_album_by_user = async (req, res) => {
  try {
    const music_album = req.params.music_album;
    const user = req.session.user;

    const rate = await dbManageRates.getRateAlbumByUser(music_album, user);
    console.log(rate);
    // if (rate === undefined) {
    //   return res.sendStatus(404);
    // }
    return res.json(rate);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_rates_albums_by_user = async (req, res) => {
  try {
    const username = req.params.username;

    const rates = await dbManageRates.getAllRatesAlbumsByUser(username);
    if (rates === undefined) {
      return res.sendStatus(404);
    }
    return res.json(rates);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_rates_albums_by_user_query = async (req, res) => {
  try {
    const username = req.params.username;
    let sortBy = req.query.sortBy;
    let sort_value;
    let sort_order;
    let rates;
    let length;
    const limit = 5;
    const page_index = parseInt(req.query.page) || 1;

    const offset = limit * (page_index - 1);

    if (sortBy === undefined) {
      sort_value = "rating-date";
      sort_order = "DESC";
    } else {
      sortBy = req.query.sortBy.split("_");
      sort_value = sortBy[0];
      sort_order = sortBy[1];
    }

    const favourite = req.query.favourite;
    if (favourite === undefined) {
      rates = await dbManageRates.getAllRatesAlbumsByUserQuery(
        username,
        sort_value,
        sort_order,
        limit,
        offset
      );
      length = await dbManageRates.getLengthOfRatesAlbumsByUserQuery(username);
    } else {
      rates = await dbManageRates.getAllRatesAlbumsByUserQueryFilter(
        username,
        favourite,
        sort_value,
        sort_order,
        limit,
        offset
      );
      length = await dbManageRates.getLengthOfRatesAlbumsByUserQueryFilter(
        username,
        favourite
      );
    }
    if (rates === undefined) {
      return res.sendStatus(404);
    }
    return res.json({ rates, length });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_rate_song_by_user = async (req, res) => {
  try {
    const song = req.params.song;
    const user = req.session.user;

    const rate = await dbManageRates.getRateSongByUser(song, user);
    if (rate === undefined) {
      return res.sendStatus(404);
    }
    return res.json(rate);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_rate_song_by_user_tracklist = async (req, res) => {
  try {
    const song = req.params.song;
    const user = req.session.user;

    if (user === undefined) {
      return res.json(null);
    } else {
      const rate = await dbManageRates.getRateSongByUser(song, user);
      if (rate === undefined) {
        return res.json(null);
      }
      return res.json(rate);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_rates_songs_by_user = async (req, res) => {
  try {
    const username = req.params.username;

    const rates = await dbManageRates.getAllRatesSongsByUser(username);
    if (rates === undefined) {
      return res.sendStatus(404);
    }
    return res.json(rates);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_all_rates_songs_by_user_query = async (req, res) => {
  try {
    const username = req.params.username;
    let sortBy = req.query.sortBy;
    let sort_value;
    let sort_order;
    let rates;
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

    if (sortBy === undefined) {
      sort_value = "rating-date";
      sort_order = "DESC";
    } else {
      sortBy = req.query.sortBy.split("_");
      sort_value = sortBy[0];
      sort_order = sortBy[1];
    }

    const favourite = req.query.favourite;
    if (favourite === undefined) {
      rates = await dbManageRates.getAllRatesSongsByUserQuery(
        username,
        sort_value,
        sort_order,
        limit,
        offset
      );
      length = await dbManageRates.getLengthOfRatesSongsByUserQuery(username);
    } else {
      rates = await dbManageRates.getAllRatesSongsByUserQueryFilter(
        username,
        favourite,
        sort_value,
        sort_order,
        limit,
        offset
      );
      length = await dbManageRates.getLengthOfRatesSongsByUserQueryFilter(
        username
      );
    }
    if (rates === undefined) {
      return res.sendStatus(404);
    }
    return res.json({ rates, length });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_statistics_of_album = async (req, res) => {
  try {
    const music_album = req.params.music_album;

    const stats = await dbManageRates.getStatisticsOfAlbum(music_album);
    if (stats === undefined) {
      return res.sendStatus(404);
    }
    return res.json(stats);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_statistics_of_song = async (req, res) => {
  try {
    const song = req.params.song;

    const stats = await dbManageRates.getStatisticsOfSong(song);
    if (stats === undefined) {
      return res.sendStatus(404);
    }
    return res.json(stats);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

get_statistics_of_all_rates_by_user = async (req, res) => {
  try {
    const username = req.params.username;

    const id_user = await dbManageRates.getIdUserByUsername(username);

    const stats = await dbManageRates.getStatisticsOfAllRatesByUser(id_user);
    if (stats === undefined) {
      return res.sendStatus(404);
    }
    return res.json(stats);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

edit_rate = async (req, res) => {
  try {
    const { id_rate, numerical_rating, verbal_rating, favourites } = req.body;

    await dbManageRates.editRate(
      id_rate,
      numerical_rating,
      verbal_rating,
      favourites
    );
    return res.status(200).send({ msg: "Rate have been edited" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

delete_rate = async (req, res) => {
  try {
    const { id_rate } = req.body;

    await dbManageRates.deleteRate(id_rate);
    return res.status(200).send({ msg: "Rate have been deleted" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = {
  add_rate_album,
  add_rate_song,
  get_rate_album_by_user,
  get_rate_song_by_user,
  get_rate_song_by_user_tracklist,
  get_all_rates_albums_by_user,
  get_all_rates_albums_by_user_query,
  get_all_rates_songs_by_user,
  get_all_rates_songs_by_user_query,
  get_statistics_of_song,
  get_statistics_of_album,
  get_statistics_of_all_rates_by_user,
  edit_rate,
  delete_rate,
};