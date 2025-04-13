const express = require("express");
const router = express.Router();
const coolerController = require("../controllers/coolerController.js");
const { userRoles } = require("../utility/constants.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");

router.get("/", coolerController.getAll);
router.get("/:id", coolerController.getOne);
router.post("/", checkHandler(userRoles.ADMIN), coolerController.create);

module.exports = router;
