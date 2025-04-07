const { Power } = require("../models/index.js");

exports.getAll = async (req, res) => {
    const components = await Power.findAll();
    res.json(components);
};

exports.create = async (req, res) => {
    const component = await Power.create(req.body);
    res.status(201).json(component);
};
