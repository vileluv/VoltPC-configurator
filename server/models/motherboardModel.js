const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Motherboard = sequelize.define(
    "Motherboard",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        releaseDate: { type: DataTypes.DATE, allowNull: false },
        socket: { type: DataTypes.STRING, allowNull: false },
        chipset: { type: DataTypes.STRING, allowNull: false },
        formfactor: { type: DataTypes.STRING, allowNull: false },
        ramType: { type: DataTypes.STRING, allowNull: false },
        maxRamAmount: { type: DataTypes.INTEGER, allowNull: false },
        m2Amount: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
);

module.exports = Motherboard;
