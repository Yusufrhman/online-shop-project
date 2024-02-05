// ini bukan front end javascript, jangan di hapus/diotak atik
const express = require("express");
const router = express();
const custController = require("../controllers/customer.controller");

router.get("/account", custController.getAccount);

router.post("/account", custController.saveAccount);

module.exports = router;
