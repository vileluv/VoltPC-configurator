const express = require("express");
const router = express.Router();
const powerController = require("../controllers/powerController.js");
const { userRoles } = require("../utility/constants.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");

router.get("/", powerController.getAll);
router.get("/:id", powerController.getOne);
router.post("/", checkHandler(userRoles.ADMIN), powerController.create);

module.exports = router;
