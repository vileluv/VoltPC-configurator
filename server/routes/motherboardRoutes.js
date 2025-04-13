const express = require("express");
const router = express.Router();
const motherboardController = require("../controllers/motherboardController.js");
const { userRoles } = require("../utility/constants.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");

router.get("/", motherboardController.getAll);
router.get("/:id", motherboardController.getOne);
router.post("/", checkHandler(userRoles.ADMIN), motherboardController.create);

module.exports = router;
