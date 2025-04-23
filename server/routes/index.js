const Router = require("express");
const userRouter = require("./userRoutes.js");
const hardwaresRouter = require("./hardwaresRoutes.js");
const filterRouter = require("./filterRoutes.js");
const { hardwares } = require("../utility/constants.js");
const router = new Router();

router.use("/user", userRouter);
router.use(filterRouter);
hardwares.forEach(element => {
    const hardwareRouter = hardwaresRouter[element];
    if (!hardwareRouter) return;
    router.use(`/${element.toLowerCase()}`, hardwareRouter);
});

module.exports = router;
