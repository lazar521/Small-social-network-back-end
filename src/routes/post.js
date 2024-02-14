const express = require("express");
const router = new express.Router();

const postController = require("../controllers/post");
const tokenAuth = require("../token-auth");

router.post("/publish",tokenAuth,postController.publishPost);

router.get("/feed",tokenAuth,postController.getFeed);

module.exports = router;