const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storageController.js");
const { userRoles } = require("../utility/constants.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");

router.get("/", storageController.getAll);
router.get("/:id", storageController.getOne);
router.post("/", checkHandler(userRoles.ADMIN), storageController.create);

module.exports = router;
