const Router = require("express");
const userRouter = require("./userRoutes.js");
const hardwaresRouter = require("./hardwaresRoutes.js");
const foreignsRouter = require("./foreignsRoutes.js");
const filterRouter = require("./filterRoutes.js");
const configuratorRouter = require("./configuratorRoutes.js");
const { hardwares, foreigns } = require("../utility/constants.js");
const router = new Router();

router.use("/user", userRouter);
router.use(filterRouter);
router.use(configuratorRouter);
hardwares.forEach(element => {
    const hardwareRouter = hardwaresRouter[element];
    if (!hardwareRouter) return;
    router.use(`/${element.toLowerCase()}`, hardwareRouter);
});
foreigns.forEach(element => {
    const foreignRouter = foreignsRouter[element];
    if (!foreignRouter) return;
    router.use(`/${element.toLowerCase()}`, foreignRouter);
});

module.exports = router;
