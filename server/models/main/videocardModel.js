const { DataTypes } = require("sequelize");
const sequelize = require("../../utility/database.js");

const Videocard = sequelize.define(
    "Videocard",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        img: { type: DataTypes.STRING, allowNull: false },
        releaseDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            get() {
                const value = this.getDataValue("releaseDate");
                return new Date(value).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
            },
            set(value) {
                this.setDataValue("releaseDate", new Date(value).toISOString());
            },
        },
        processorBrand: { type: DataTypes.STRING, allowNull: false },
        interface: { type: DataTypes.STRING, allowNull: false },
        fanAmount: { type: DataTypes.INTEGER, allowNull: false },
        connectors: { type: DataTypes.TEXT, allowNull: false },
        nanometers: { type: DataTypes.INTEGER, allowNull: false },
        clockSpeed: { type: DataTypes.INTEGER, allowNull: false },
        maxResolution: { type: DataTypes.STRING, allowNull: false },
        maxMonitors: { type: DataTypes.STRING, allowNull: false },
        width: { type: DataTypes.INTEGER, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        weight: { type: DataTypes.FLOAT, allowNull: false },
        powerPin: { type: DataTypes.INTEGER, allowNull: false },
        power: { type: DataTypes.INTEGER, allowNull: false },
        memorySize: { type: DataTypes.INTEGER, allowNull: false },
        memoryType: { type: DataTypes.STRING, allowNull: false },
        memoryClock: { type: DataTypes.INTEGER, allowNull: false },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.processorBrand} ${this.name} ${this.brand} `;
            },
            set(value) {
                console.error("Do not try to set the `fullName` value!");
            },
        },
    },
    { timestamps: false }
);

module.exports = Videocard;
