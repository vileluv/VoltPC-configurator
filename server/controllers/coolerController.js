const { Cooler } = require("../models/index.js");

exports.getAll = async (req, res) => {
    const components = await Cooler.findAll();
    res.json(components);
};

exports.create = async (req, res) => {
    const component = await Cooler.create(req.body);
    res.status(201).json(component);
};
