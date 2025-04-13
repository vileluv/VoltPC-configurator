const { Storage } = require("../models/index.js");

exports.getAll = async (req, res) => {
    const components = await Storage.findAll();
    res.json(components);
};
exports.getOne = async (req, res) => {
    const { id } = req.params;
    const device = await Storage.findOne({ where: { id } });
    return res.json(device);
};
exports.create = async (req, res) => {
    const component = await Storage.create(req.body);
    res.status(201).json(component);
};
