const express = require("express");
const router = express.Router();
const videocardController = require("../controllers/videocardController.js");
const { userRoles } = require("../utility/constants.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");

router.get("/", videocardController.getAll);
router.get("/:id", videocardController.getOne);
router.post("/", checkHandler(userRoles.ADMIN), videocardController.create);

module.exports = router;
