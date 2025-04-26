const express = require("express");
const controllers = require("../controllers/hardwaresController.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");
const { userRoles, hardwares } = require("../utility/constants.js");
const hardwaresRoutes = {};
hardwares.forEach(element => {
    const router = express.Router();
    const controller = controllers[element];
    if (!controller) return;
    router.post("/", controller.getAllWithFilters);
    router.get("/:id", controller.getOne);
    router.post("/create", checkHandler(userRoles.ADMIN), controller.create);
    hardwaresRoutes[element] = router;
});
module.exports = hardwaresRoutes;
