const express = require("express");

const mysql = require("mysql2/promise");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

const authRoute = require("./routes/auth");

const server = express();
const PORT = 8000;

const ONE_WEEK = 1000 * 60 * 60 * 168;

const options = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "brad20thcentury",
  database: "db_inz",
};

const connection = mysql.createPool(options);
const sessionStore = new mysqlStore({}, connection);

server.use(express.json()); //middleware
server.use(express.urlencoded({ extended: false })); //middleware

server.use(
  session({
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: "ArtJud174",
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

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
