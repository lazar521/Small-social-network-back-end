const express = require("express");
const router = new express.Router();

const postController = require("../controllers/post");
const tokenAuth = require("../util/token-auth");


// These reqests are only accessible to logged in users, so we need to do the authentication first

router.post("/publish",tokenAuth,postController.publishPost);

router.get("/feed",tokenAuth,postController.getFeed);


module.exports = router;