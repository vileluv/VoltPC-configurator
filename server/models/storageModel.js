const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Storage = sequelize.define(
    "Storage",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        releaseDate: { type: DataTypes.DATE, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        formfactor: { type: DataTypes.FLOAT, allowNull: false },
        interface: { type: DataTypes.STRING, allowNull: false },
        memorySize: { type: DataTypes.INTEGER, allowNull: false },
        weight: { type: DataTypes.FLOAT, allowNull: true },
        spindleSpeed: { type: DataTypes.INTEGER, allowNull: true },
        readSpeed: { type: DataTypes.INTEGER, allowNull: true },
        writeSpeed: { type: DataTypes.INTEGER, allowNull: true },
        tbw: { type: DataTypes.INTEGER, allowNull: true },
    },
    { timestamps: false }
);

module.exports = Storage;
