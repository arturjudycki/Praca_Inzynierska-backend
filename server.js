const express = require("express");
require("dotenv").config();
const mysql = require("mysql2/promise");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
var cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const textRoute = require("./routes/texts");
const commentRoute = require("./routes/comments");
const albumRoute = require("./routes/albums");
const artistRoute = require("./routes/artists");
const songRoute = require("./routes/songs");
const rateRoute = require("./routes/rates");

const server = express();

const ONE_WEEK = 1000 * 60 * 60 * 168;

const options = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const connection = mysql.createPool(options);
const sessionStore = new mysqlStore({}, connection);

server.use(cors(corsOptions));
server.use(express.json()); //middleware
server.use(express.urlencoded({ extended: false })); //middleware

server.use(
  session({
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: ONE_WEEK,
      sameSite: true,
    },
  })
);

server.use((req, res, next) => {
  console.log(`${req.method} - ${req.url} - ${req.session}`);
  next();
}); // middleware

server.use("/auth", authRoute);
server.use("/user", userRoute);
server.use("/text", textRoute);
server.use("/comment", commentRoute);
server.use("/album", albumRoute);
server.use("/artist", artistRoute);
server.use("/song", songRoute);
server.use("/rate", rateRoute);


server.listen(process.env.APP_PORT, () => {
  console.log(`http://localhost:${process.env.APP_PORT}`);
});
