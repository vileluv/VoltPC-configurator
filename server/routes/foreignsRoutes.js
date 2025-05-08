const express = require("express");
const controllers = require("../controllers/foreignController.js");
const checkHandler = require("../middleware/checkRoleMiddleware.js");
const { userRoles, foreigns } = require("../utility/constants.js");
const hardwaresRoutes = {};

foreigns.forEach(element => {
    const router = express.Router();
    const controller = controllers[element];
    if (!controller) return;
    router.get("/", checkHandler(userRoles.ADMIN), controller.getAll);
    router.get("/model", checkHandler(userRoles.ADMIN), controller.getForeignModel);
    router.post("/create", checkHandler(userRoles.ADMIN), controller.create);
    router.delete("/delete", checkHandler(userRoles.ADMIN), controller.delete);
    router.get("/:id", checkHandler(userRoles.ADMIN), controller.getOne);

    hardwaresRoutes[element] = router;
});
module.exports = hardwaresRoutes;
