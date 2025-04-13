const Router = require("express");
const caseRouter = require("./caseRoutes.js");
const coolerRouter = require("./coolerRoutes.js");
const motherboardRouter = require("./motherboardRoutes.js");
const powerRouter = require("./powerRoutes.js");
const processorRouter = require("./processorRoutes.js");
const ramRouter = require("./ramRoutes.js");
const storageRouter = require("./storageRoutes.js");
const videocardRouter = require("./videocardRoutes.js");
const userRouter = require("./userRoutes.js");

const router = new Router();
router.use("/user", userRouter);
router.use("/videocard", videocardRouter);
router.use("/storage", storageRouter);
router.use("/ram", ramRouter);
router.use("/processor", processorRouter);
router.use("/power", powerRouter);
router.use("/motherboard", motherboardRouter);
router.use("/cooler", coolerRouter);
router.use("/case", caseRouter);

module.exports = router;
