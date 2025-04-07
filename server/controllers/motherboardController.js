const { Motherboard } = require("../models/index.js");

exports.getAll = async (req, res) => {
    const components = await Motherboard.findAll();
    res.json(components);
};

exports.create = async (req, res) => {
    const component = await Motherboard.create(req.body);
    res.status(201).json(component);
};
