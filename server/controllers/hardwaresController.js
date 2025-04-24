const { Op } = require("sequelize");
const models = require("../models/index.js");
const { hardwares, FILTER_MODEL_TYPES, FILTER_TYPES } = require("../utility/constants.js");

const hardwaresController = {};
hardwares.forEach(hardware => {
    const modelController = {};
    const model = models[hardware];
    if (!model) return;
    modelController.getAll = async (req, res) => {
        let { page, limit } = req.query;

        page = page || 1;
        limit = limit || 10;
        const offset = page * limit - limit;
        const components = await model.findAndCountAll({
            limit,
            offset,
        });

        res.json(components);
    };
    modelController.getAllWithFilters = async (req, res) => {
        let { page, limit } = req.query;
        let { data: filters } = req.body;
        page = page || 1;
        limit = limit || 10;

        const offset = page * limit - limit;
        const fields = Object.keys(model.getAttributes());
        const validatedFilters = {};
        fields.forEach(async field => {
            if (filters[field] !== undefined) validatedFilters[field] = filters[field];
        });
        const where = [];
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
                }
            });
        }

        const components = await model.findAndCountAll({
            where: { [Op.and]: [...where] },
            limit,
            offset,
        });

        res.json(components);
    };
    modelController.getOne = async (req, res) => {
        const { id } = req.params;
        const device = await model.findOne({ where: { id } });
        return res.json(device);
    };
    modelController.create = async (req, res) => {
        const component = await model.create(req.body);
        res.status(201).json(component);
    };
    hardwaresController[hardware] = modelController;
});
module.exports = hardwaresController;
