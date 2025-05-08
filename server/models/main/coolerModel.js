const { DataTypes, col } = require("sequelize");
const sequelize = require("../../utility/database.js");

const Cooler = sequelize.define(
    "Cooler",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        img: { type: DataTypes.STRING, allowNull: false },
        releaseDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            get() {
                const value = this.getDataValue("releaseDate");
                if (value===null) return null
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
        maxTdp: { type: DataTypes.INTEGER, allowNull: false },
        material: { type: DataTypes.STRING, allowNull: false },
        height: { type: DataTypes.INTEGER, allowNull: false },
        weight: { type: DataTypes.FLOAT, allowNull: false },
        fanNoise: { type: DataTypes.FLOAT, allowNull: false },
        fanSize: { type: DataTypes.INTEGER, allowNull: false },
        fanMinSpeed: { type: DataTypes.INTEGER, allowNull: false },
        fanMaxSpeed: { type: DataTypes.INTEGER, allowNull: false },
        bearing: { type: DataTypes.STRING, allowNull: false },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.brand} ${this.name}`;
            },
            set(value) {
                console.error("Do not try to set the `fullName` value!");
            },
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Cooler;
