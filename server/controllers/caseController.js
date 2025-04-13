const { Case } = require("../models/index.js");

exports.getAll = async (req, res) => {
    const components = await Case.findAll();
    res.json(components);
};
exports.getOne = async (req, res) => {
    const { id } = req.params;
    const device = await Case.findOne({ where: { id } });
    return res.json(device);
};
exports.create = async (req, res) => {
    const component = await Case.create(req.body);
    res.status(201).json(component);
};
