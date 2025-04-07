const sequelize = require("../utility/database.js");
const Case = require("./caseModel.js");
const Cooler = require("./coolerModel.js");
const Motherboard = require("./motherboardModel.js");
const Power = require("./powerModel.js");
const Processor = require("./processorModel.js");
const Ram = require("./ramModel.js");
const Storage = require("./storageModel.js");
const Videocard = require("./videocardModel.js");

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.info("Database was syncronized");
    } catch (error) {
        console.error("Error to syncronize database:", error);
    }
};

module.exports = { sequelize, syncDatabase, Case, Cooler, Motherboard, Power, Processor, Ram, Storage, Videocard };
