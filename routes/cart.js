const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("../views/cart.ejs", { title: "Carrito" });
});

module.exports(router)  