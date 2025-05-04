const models = require("../models/index.js");
const ApiError = require("../utility/apiError.js");
const capitalize = require("../utility/capitalize.js");
exports.getComponents = async (req, res, next) => {
    const { code } = req.query;
    let unpacked;
    try {
        unpacked = JSON.parse(Buffer.from(code, "base64").toString());
    } catch (e) {
        return next(ApiError.badRequest("Некорректный код конфигурации"));
    }
    const result = [];
    for (const item of unpacked) {
        const key = Object.keys(item)[0];
        if (!key) continue;
        const model = models[capitalize(key)];
        if (!model) continue;
        const include = Object.values(model.associations).map(assoc => ({
            model: assoc.target,
        }));
        const value = await model.findOne({
            where: { id: Object.values(item)[0] },
            include,
        });
        if (!value) continue;
        result.push({
            [key]: value,
        });
    }
    res.json(result);
};
