const { DataTypes } = require("sequelize");
const sequelize = require("../../utility/database.js");

const StorageInterface = sequelize.define(
    "StorageInterface",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { timestamps: false }
);
module.exports = StorageInterface;
