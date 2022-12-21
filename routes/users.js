const { Router } = require("express");

const router = Router();

// router.get("/", (req, res) => {
//   res.send(200);
// });

// const users = [{ name: "Artur", age: 22 }];

// server.get("/", (req, res) => {
//   res.send({
//     msg: "Hi",
//   });
// });

// server.get("/users", (req, res) => {
//   res.status(200).send(users);
// });

// server.post("/users", (req, res) => {
//   const user = req.body;
//   users.push(user);
//   res.status(201).send("Created User");
// });

// server.get("/users/:name", (req, res) => {
//   const { name } = req.params;
//   const user = users.find((user) => user.name === name);
//   if (user) res.status(200).send(user);
//   else res.status(404).send("Not found");
// });

// function validateCookie(req, res, next) {
//   const { cookies } = req;
//   next();
// }

// server.get("/signin", (req, res) => {
//   res.cookie("session_id", "123456");
//   res.status(200).json({ msg: "Logged in" });
// });

// server.post("/login", (req, res) => {
//   console.log(req.sessionID);
//   const { username, password } = req.body;
//   if (username && password) {
//     if (req.session.authenticated) {
//       res.json(req.session);
//     } else {
//       if (password === "123") {
//         req.session.authenticated = true;
//         req.session.user = {
//           username,
//           password,
//         };
//         res.json(req.session);
//       } else {
//         res.status(403).json({ msg: "Bad Credentials" });
//       }
//     }
//   } else {
//     res.status(403).json({ msg: "Bad Credentials" });
//   }
// });

module.exports = router;
