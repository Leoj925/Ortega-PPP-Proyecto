const express = require("express");
const router = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const { saltRounds } = require("../utils/constants/bcrypt");
var validateUser = require("../controllers/middleware/validateUser")

router.get("/", (req, res) => {
    res.render("../views/register.ejs", { title: "Registro" });
});

router.post("/", validateUser, (req, res) => {
    const Users = JSON.parse(fs.readFileSync("../data/users.json", "utf8"));
    if (!req.body.username || !req.body.password) {
      res.status("400");
      res.send("Detalles inválidos!");
    } else {
      Users.filter( (user) => {
        if (user.username === req.body.username) {
          res.render("../views/register.ejs", {
            message: "Nombre de usuario no disponible",
          });
        }
      });
      var newUser = { username: req.body.username, password: req.body.password };
      hashedPassword = bcrypt.hashSync(
        newUser.password,
        saltRounds,
        function (err, hash) {
          if (err) {
            console.log(err);
          }
        }
      );
      newUser.password = hashedPassword;
      Users.push(newUser);
      fs.writeFileSync("../data/users.json", JSON.stringify(Users, null, 3));
      req.session.user = newUser;
      req.session.loggedIn = true;
    }
  }
);

module.exports = router;