const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Processor = sequelize.define(
    "Processor",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        releaseDate: { type: DataTypes.DATE, allowNull: false },
        socket: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        speed: { type: DataTypes.INTEGER, allowNull: false },
        cores: { type: DataTypes.INTEGER, allowNull: false },
        threads: { type: DataTypes.INTEGER, allowNull: false },
        tdp: { type: DataTypes.INTEGER, allowNull: false },
        nanometers: { type: DataTypes.INTEGER, allowNull: false },
        cacheL1: { type: DataTypes.INTEGER, allowNull: false },
        cacheL2: { type: DataTypes.INTEGER, allowNull: false },
        cacheL3: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
);

module.exports = Processor;
