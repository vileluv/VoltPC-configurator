const { FILTER_MODEL_TYPES, FILTER_TYPES } = require("../utility/constants.js");
const models = require("../models/index.js");
const ApiError = require("../utility/apiError.js");
const { fn, col } = require("sequelize");
exports.getFilters = async (req, res, next) => {
    const { type } = req.query;
    const model = models[String(type).charAt(0).toUpperCase() + String(type).slice(1)];
    if (!model) return next(ApiError.badRequest("Некорректный тип модели для фильтрации"));
    const filterOnModelType = FILTER_MODEL_TYPES[type];
    if (!filterOnModelType) return next(ApiError.badRequest("Не удалось найти модель фильтрации"));
    const fields = Object.keys(model.getAttributes());
    for (const field of fields) {
        const filterField = filterOnModelType[field];
        if (!filterField) continue;

        switch (filterField.type) {
            case FILTER_TYPES.selector: {
                const items = await model.findAll({
                    attributes: [field],
                    group: [field],
                });
                const itemsArray = items.map(item => item[field]).filter(f => f !== null);
                if (itemsArray.length === 0) {
                    filterField.values = undefined;
                    break;
                }
                filterField.values = itemsArray;
                break;
            }
            case FILTER_TYPES.interval: {
                const items = await model.findOne({
                    attributes: [
                        [fn("MIN", col(field)), "min"],
                        [fn("MAX", col(field)), "max"],
                    ],
                    raw: true,
                });

                if (items.min === null) {
                    filterField.values = undefined;
                    break;
                }
                filterField.values = items;
                break;
            }
            default: {
                break;
            }
        }
    }

    res.json(filterOnModelType);
};
