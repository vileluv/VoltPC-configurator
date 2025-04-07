const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Videocard = sequelize.define(
    "Videocard",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        releaseDate: { type: DataTypes.DATE, allowNull: false },
        interface: { type: DataTypes.STRING, allowNull: false },
        fanAmount: { type: DataTypes.INTEGER, allowNull: false },
        connectors: {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
                const value = this.getDataValue("connectors");
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue("connectors", JSON.stringify(value));
            },
        },
        nanometers: { type: DataTypes.INTEGER, allowNull: false },
        clockSpeed: { type: DataTypes.INTEGER, allowNull: false },
        maxResolution: { type: DataTypes.STRING, allowNull: false },
        maxMonitors: { type: DataTypes.STRING, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        weight: { type: DataTypes.FLOAT, allowNull: false },
        powerPin: { type: DataTypes.INTEGER, allowNull: false },
        power: { type: DataTypes.INTEGER, allowNull: false },
        memorySize: { type: DataTypes.INTEGER, allowNull: false },
        memoryType: { type: DataTypes.STRING, allowNull: false },
        memoryClock: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
);

module.exports = Videocard;
