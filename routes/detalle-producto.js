const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("../views/productDetail.ejs", { title: "Detalle-Producto" });
});

module.exports =router  