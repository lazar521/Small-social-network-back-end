const express = require("express");

const router = new express.Router();

const userRouter = require("../routes/user");
const connectionRouter = require("../routes/connection");
const postRouter = require("../routes/post");

router.use("/user",userRouter);
router.use("/connection",connectionRouter);
router.use("/post",postRouter);

module.exports = router;