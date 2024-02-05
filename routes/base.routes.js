// ini bukan front end javascript, jangan di hapus/diotak atik
const express = require("express");
const router = express();
const baseController = require("../controllers/base.controller");

router.get("/", baseController.getHome)
router.get("/products", baseController.getAllProducts)
router.get("/products/:id", baseController.getProduct);
router.get("/403", baseController.get403);

module.exports = router
