const express = require("express");
const router = new express.Router();

const userController = require("./controller");

router.post("/signup",userController.signUp)

router.post("/login",userController.login);

module.exports = router;