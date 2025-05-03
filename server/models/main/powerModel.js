const { DataTypes } = require("sequelize");
const sequelize = require("../../utility/database.js");

const Power = sequelize.define(
    "Power",
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
        power: { type: DataTypes.INTEGER, allowNull: false },
        standart: { type: DataTypes.STRING, allowNull: false },
        fanSize: { type: DataTypes.INTEGER, allowNull: false },
        certificate: { type: DataTypes.STRING, allowNull: false },
        motherboardPinType: { type: DataTypes.STRING, allowNull: false },
        cpuPinType: { type: DataTypes.STRING, allowNull: false },
        pciePinType: { type: DataTypes.STRING, allowNull: false },
        idePinType: { type: DataTypes.STRING, allowNull: false },
        sataPinType: { type: DataTypes.STRING, allowNull: false },
        cpuPinAmount: { type: DataTypes.INTEGER, allowNull: false },
        pciePinAmount: { type: DataTypes.INTEGER, allowNull: false },
        idePinAmount: { type: DataTypes.INTEGER, allowNull: false },
        sataPinAmount: { type: DataTypes.INTEGER, allowNull: false },
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
    { timestamps: false }
);

module.exports = Power;
