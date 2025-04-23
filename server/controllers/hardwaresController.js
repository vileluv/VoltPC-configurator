const models = require("../models/index.js");
const { hardwares } = require("../utility/constants.js");

const hardwaresController = {};
hardwares.forEach(hardware => {
    const modelController = {};
    const model = models[hardware];
    if (!model) return;
    modelController.getAll = async (req, res) => {
        let { page, limit, ...queries } = req.query;

        page = page || 1;
        limit = limit || 10;

        const offset = page * limit - limit;
        const fields = Object.keys(model.getAttributes());
        const validatedQueries = {};
        fields.forEach(async field => {
            if (queries[field] !== undefined) validatedQueries[field] = queries[field];
        });
        const where = { ...validatedQueries };

        const components = await model.findAndCountAll({
            where,
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
