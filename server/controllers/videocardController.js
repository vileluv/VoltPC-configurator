const { Storage: Videocard } = require("../models/index.js");

exports.getAll = async (req, res) => {
    const components = await Videocard.findAll();
    res.json(components);
};

exports.create = async (req, res) => {
    const component = await Videocard.create(req.body);
    res.status(201).json(component);
};
