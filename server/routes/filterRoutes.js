const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filterController.js");

router.get("/filters", filterController.getFilters);

module.exports = router;
