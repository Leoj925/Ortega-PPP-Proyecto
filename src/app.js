const express = require("express");
const PORT = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const app = express();
const tareasRouter = require("../models/tasks");
var checkLogin = require("../controllers/middleware/checkLogin");


var indexRouter = require("../routes/home");
var register = require("../routes/register");
var login = require("../routes/login")
var logout = require("../routes/logout");
var productDetail = require("../routes/detalle-producto")
var cart = require("../routes/cart");

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.listen(PORT, ()=> console.log("Escuchando al puerto: ",PORT));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );

app.use("/", indexRouter);
app.use("/register", register);
app.use("/login",login)
app.use("/logout", logout);
app.use("/productDetail",productDetail)
app.use("/cart",cart)



