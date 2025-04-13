const express = require("express");
const router = express.Router();
const caseController = require("../controllers/caseController.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");
const { userRoles } = require("../utility/constants.js");

router.get("/", caseController.getAll);
router.get("/:id", caseController.getOne);
router.post("/", checkHandler(userRoles.ADMIN), caseController.create);

module.exports = router;
