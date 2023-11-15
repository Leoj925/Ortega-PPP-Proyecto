var express = require("express");
var router = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const checkLogin = require("../controllers/checkLogin")

router.get("/", checkLogin, (req, res) => {
  res.render("../views/login");
});

router.post("/", checkLogin, (req, res) =>{
  const Users = JSON.parse(fs.readFileSync("../data/users.json", "utf8"));
  if (!req.body.id || !req.body.password) {
    res.render("../views/login", { message: "Ingrese usuario y contraseña" });
  } else {
    Users.find( (user) => {
      if (user.username === req.body.id) {
        try {
          const match = bcrypt.compareSync(req.body.password, user.password);
          if (match) {
            req.session.user = user;
            req.session.loggedIn = true;
            res.redirect("/")
          } else {
            res.render("login", { message: "Credenciales inválidas!" });
          }
        } catch {
          res.render("login", { message: "Algo salió mal" });
        }
      }
    });
    res.render("login", { message: "Credenciales inválidas!" });
  }
});

module.exports = router;