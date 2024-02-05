// ini bukan front end javascript, jangan di hapus/diotak atikc
const express = require("express");
const router = express();

const cartController = require("../controllers/cart.controller");

router.get("/", cartController.getCart)
router.post("/update", cartController.updateCart)
router.post("/items", cartController.addCartItem)

module.exports = router;
