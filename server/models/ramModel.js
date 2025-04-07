const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Ram = sequelize.define(
    "Ram",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        releaseDate: { type: DataTypes.DATE, allowNull: false },
        formfactor: { type: DataTypes.STRING, allowNull: false },
        memoryType: { type: DataTypes.STRING, allowNull: false },
        memoryVolume: { type: DataTypes.INTEGER, allowNull: false },
        oneMemoryVolume: { type: DataTypes.INTEGER, allowNull: false },
        moduleAmount: { type: DataTypes.INTEGER, allowNull: false },
        moduleAmount: { type: DataTypes.INTEGER, allowNull: false },
        clockRate: { type: DataTypes.INTEGER, allowNull: false },
        bandwidth: { type: DataTypes.INTEGER, allowNull: false },
        casLatency: { type: DataTypes.INTEGER, allowNull: false },
        xmp: { type: DataTypes.BOOLEAN, allowNull: false },
        height: { type: DataTypes.FLOAT, allowNull: false },
        voltage: { type: DataTypes.FLOAT, allowNull: false },
    },
    { timestamps: false }
);

module.exports = Ram;
