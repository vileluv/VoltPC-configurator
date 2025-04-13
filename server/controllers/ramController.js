const { Ram } = require("../models/index.js");

exports.getAll = async (req, res) => {
    const components = await Ram.findAll();
    res.json(components);
};
exports.getOne = async (req, res) => {
    const { id } = req.params;
    const device = await Ram.findOne({ where: { id } });
    return res.json(device);
};
exports.create = async (req, res) => {
    const component = await Ram.create(req.body);
    res.status(201).json(component);
};
