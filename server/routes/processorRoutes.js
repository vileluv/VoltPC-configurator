const express = require("express");
const router = express.Router();
const processorController = require("../controllers/processorController.js");
const { userRoles } = require("../utility/constants.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");

router.get("/", processorController.getAll);
router.get("/:id", processorController.getOne);
router.post("/", checkHandler(userRoles.ADMIN), processorController.create);

module.exports = router;
