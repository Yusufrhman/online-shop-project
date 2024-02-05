// ini bukan front end javascript, jangan di hapus/diotak atikc
const express = require("express");
const router = express();

const authController = require("../controllers/auth.controller");

router.get("/signup", authController.getSignup);

router.post("/signup", authController.signup)

router.get("/login", authController.getLogin);

router.post("/login", authController.login)

router.post('/logout', authController.logout)

module.exports = router;
