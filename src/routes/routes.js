const express = require("express");

const router = new express.Router();


const userRouter = require("../domains/user/routes");

router.use("/user",userRouter);


module.exports = router;