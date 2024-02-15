const express = require("express");
const router = new express.Router();

const connectionController = require("../controllers/connection");
const tokenAuth = require("../token-auth");

router.post("/add",tokenAuth,connectionController.addConnection)

router.post("/remove",tokenAuth,connectionController.removeConnection);

router.get("/list",tokenAuth,connectionController.listConnections)

module.exports = router;