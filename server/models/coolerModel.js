const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Cooler = sequelize.define(
    "Cooler",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        releaseDate: { type: DataTypes.DATE, allowNull: false },
        sockets: {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
                const value = this.getDataValue("sockets");
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue("sockets", JSON.stringify(value));
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
    },
    { timestamps: false }
);

module.exports = Cooler;
