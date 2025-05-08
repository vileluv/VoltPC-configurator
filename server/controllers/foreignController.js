const models = require("../models/index.js");
const { foreigns } = require("../utility/constants.js");
const ApiError = require("../utility/apiError.js");

const foreignsController = {};
foreigns.forEach(foreign => {
    const modelController = {};
    const model = models[foreign];
    if (!model) return;
    modelController.getAll = async (req, res) => {
        const components = await model.findAll();

        res.json(components);
    };
    modelController.getOne = async (req, res) => {
        const { id } = req.params;
        const table = await model.findOne({ where: { id } });
        return res.json(table);
    };
    modelController.create = async (req, res, next) => {
        let { data } = req.body;
        try {
            const component = await model.create(data);
            res.status(201).json(component);
        } catch (err) {
            next(ApiError.badRequest("Failed create relation. Check fields for correctness."));
            return;
        }
    };
    modelController.delete = async (req, res, next) => {
        let { data } = req.body;

        if (data === undefined) {
            next(ApiError.badRequest("Data is invalid"));
            return;
        }
        const des = await model.destroy({
            where: data,
        });
        res.status(201).json(des);
    };
    modelController.getForeignModel = async (req, res) => {
        const attributes = Object.keys(model.rawAttributes).filter(attribute => attribute !== "id");

        res.json(attributes);
    };
    foreignsController[foreign] = modelController;
});
module.exports = foreignsController;
