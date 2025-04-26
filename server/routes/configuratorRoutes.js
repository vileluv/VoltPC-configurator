const express = require("express");
const router = express.Router();
const configuratorController = require("../controllers/configuratorController.js");

router.get("/configurator", configuratorController.getComponents);

module.exports = router;
