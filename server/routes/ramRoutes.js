const express = require("express");
const router = express.Router();
const ramController = require("../controllers/ramController.js");
const { userRoles } = require("../utility/constants.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");

router.get("/", ramController.getAll);
router.get("/:id", ramController.getOne);
router.post("/", checkHandler(userRoles.ADMIN), ramController.create);

module.exports = router;
