const Router = require("express");
const userController = require("../controllers/userController.js");
const router = new Router();
const authHandler = require("../middleware/authMiddleware.js");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/check", authHandler, userController.auth);

module.exports = router;
