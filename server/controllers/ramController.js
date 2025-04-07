const { Ram } = require("../models/index.js");

exports.getAll = async (req, res) => {
    const components = await Ram.findAll();
    res.json(components);
};

exports.create = async (req, res) => {
    const component = await Ram.create(req.body);
    res.status(201).json(component);
};
