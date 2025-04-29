const { Op, DataTypes } = require("sequelize");
const models = require("../models/index.js");
const { hardwares, FILTER_MODEL_TYPES, FILTER_TYPES } = require("../utility/constants.js");

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
                        where.push({ [filterKey]: { [Op.between]: [filters[filterKey].min, filters[filterKey].max] } });
                        break;
                    }
                    case FILTER_TYPES.selector: {
                        if (filters[filterKey].length === 0) break;
                        where.push({ [filterKey]: { [Op.in]: filters[filterKey] } });
                        break;
                    }
                    case FILTER_TYPES.selectorJSON: {
                        if (filters[filterKey].length === 0) break;

                        where.push({
                            [Op.and]: filters[filterKey].map(value => ({
                                [filterKey]: {
                                    [Op.like]: `%\\"${value}\\"%`,
                                },
                            })),
                        });
                        break;
                    }
                }
            });
        }
        const components = await model.findAndCountAll({
            where: { [Op.and]: where },
            limit,
            offset,
            order,
        });

        res.json(components);
    };
    modelController.getOne = async (req, res) => {
        const { id } = req.params;
        const device = await model.findOne({ where: { id } });
        return res.json(device);
    };
    modelController.create = async (req, res) => {
        let { data } = req.body;
        const component = await model.create(data);
        res.status(201).json(component);
    };
    modelController.getHardwareModel = (req, res) => {
        const attributes = Object.keys(model.rawAttributes).filter(
            attribute => attribute !== "fullName" && attribute !== "id"
        );

        res.json(attributes);
    };
    hardwaresController[hardware] = modelController;
});
module.exports = hardwaresController;
