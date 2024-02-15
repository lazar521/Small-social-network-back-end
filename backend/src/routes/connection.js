const express = require("express");
const router = new express.Router();

const connectionController = require("../controllers/connection");
const tokenAuth = require("../util/token-auth");


// These reqests are only accessible to logged in users, so we need to do the authentication first

router.post("/add",tokenAuth,connectionController.addConnection)

router.post("/remove",tokenAuth,connectionController.removeConnection);

router.get("/list",tokenAuth,connectionController.listConnections)



module.exports = router;