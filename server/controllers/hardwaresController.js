const { Op } = require("sequelize");
const models = require("../models/index.js");
const { hardwares, FILTER_MODEL_TYPES, FILTER_TYPES } = require("../utility/constants.js");
const ApiError = require("../utility/apiError.js");

const MAX_LIMIT = 100;
function validateNumber(num) {
    const validNum = parseInt(num, 10);
    if (isNaN(validNum) || validNum <= 0) {
        return 10;
    }
    if (validNum > MAX_LIMIT) {
        return MAX_LIMIT;
    }
    return validNum;
}

const coModels = [];
function filterRaws(obj) {
    let rows;
    for (const coModel of coModels) {
        rows = obj.rows.filter(item => {
            const names = item[coModel.model]?.map(f => f.name) || [];
            return coModel.values.every(name => names.includes(name));
        });
    }
    coModels.length = 0;
    return {
        ...obj,
        rows: rows || obj.rows,
    };
}
const replaceOrAdd = (arr, el, key) => {
    const existingIndex = arr.findIndex(e => e[key] === el[key]);

    if (existingIndex >= 0) {
        arr[existingIndex] = el;
    } else {
        arr.push(el);
    }
};
const hardwaresController = {};
hardwares.forEach(hardware => {
    const modelController = {};
    const model = models[hardware];
    if (!model) return;
    modelController.getAllWithFilters = async (req, res) => {
        let { page, limit, ...sortParams } = req.query;
        let { data: filters } = req.body;
        page = validateNumber(page);
        limit = validateNumber(limit);

        const offset = page * limit - limit;

        const fields = Object.keys(model.getAttributes());

        const validatedParams = {};
        fields.forEach(async field => {
            if (sortParams[field] !== undefined) validatedParams[field] = sortParams[field];
        });
        const where = [];
        const order = [];
        const include = Object.values(model.associations).map(assoc => ({
            model: assoc.target,
        }));

        Object.keys(validatedParams).forEach(sortKey => {
            let sortValue;
            if (Number(validatedParams[sortKey]) === 0) return;
            if (Number(validatedParams[sortKey]) === 1) sortValue = "ASC";
            if (Number(validatedParams[sortKey]) === 2) sortValue = "DESC";
            if (!sortValue) return;
            order.push([sortKey, sortValue]);
        });
        const filterTypes = FILTER_MODEL_TYPES[hardware.toLowerCase()];
        if (filterTypes !== undefined) {
            Object.keys(filterTypes).forEach(filterKey => {
                if (filters[filterKey] === undefined) return;
                switch (filterTypes[filterKey].type) {
                    case FILTER_TYPES.interval: {
                        const min = filters[filterKey].min || null;
                        const max = filters[filterKey].max || null;
                        const priceFilter = {};

                        if (min !== null) priceFilter[Op.gte] = min;
                        if (max !== null) priceFilter[Op.lte] = max;
                        if (Reflect.ownKeys(priceFilter).length > 0) {
                            where.push({
                                [filterKey]: priceFilter,
                            });
                        }

                        break;
                    }
                    case FILTER_TYPES.selector: {
                        if (filters[filterKey].length === 0) break;
                        where.push({ [filterKey]: { [Op.in]: filters[filterKey] } });
                        break;
                    }
                    case FILTER_TYPES.selectorWithForeign: {
                        if (filters[filterKey].length === 0) break;
                        replaceOrAdd(
                            include,
                            {
                                model: models[filterTypes[filterKey].foreign],
                                where: {
                                    name: { [Op.in]: filters[filterKey] },
                                },
                            },
                            "model"
                        );

                        break;
                    }
                    case FILTER_TYPES.selectorWithManyForeign: {
                        if (filters[filterKey].length === 0) break;
                        const foreignCoModel = models[filterTypes[filterKey].foreign.coModel];
                        coModels.push({
                            model: filterTypes[filterKey].foreign.coModel + "s",
                            values: filters[filterKey],
                        });
                        replaceOrAdd(
                            include,
                            {
                                model: foreignCoModel,
                                through: { attributes: [] },
                            },
                            "model"
                        );
                        break;
                    }
                }
            });
        }
        const components = filterRaws(
            await model.findAndCountAll({
                where: { [Op.and]: where },
                include,
                limit,
                offset,
                order,
            })
        );

        res.json(components);
    };
    modelController.getOne = async (req, res) => {
        const { id } = req.params;
        const include = Object.values(model.associations).map(assoc => ({
            model: assoc.target,
        }));
        const device = await model.findOne({ where: { id }, include });
        return res.json(device);
    };
    modelController.create = async (req, res, next) => {
        let { data } = req.body;
        try {
            const component = await model.create(data);
            res.status(201).json(component);
        } catch (err) {
            next(ApiError.badRequest("Failed create hardware. Check fields for correctness."));
        }
    };
    modelController.delete = async (req, res, next) => {
        let { id } = req.query;
        if (id === undefined) {
            next(ApiError.badRequest("Id is invalid"));
            return;
        }
        const des = await model.destroy({
            where: {
                id,
            },
        });
        res.status(201).json(des);
    };
    modelController.getHardwareModel = async (req, res) => {
        const attributes = Object.keys(model.rawAttributes).filter(
            attribute => attribute !== "fullName" && attribute !== "id"
        );

        res.json(attributes);
    };
    hardwaresController[hardware] = modelController;
});
module.exports = hardwaresController;
