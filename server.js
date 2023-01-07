const express = require("express");

const authRoute = require("./routes/auth");

const server = express();
const PORT = 8000;

server.use(express.json()); //middleware
server.use(express.urlencoded({ extended: false })); //middleware

server.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
}); // middleware

server.use("/auth", authRoute);

server.listen(PORT || 8000, () => {
  console.log("http://localhost:8000");
});
