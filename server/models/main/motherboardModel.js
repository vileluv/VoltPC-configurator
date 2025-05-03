const { DataTypes, col } = require("sequelize");
const sequelize = require("../../utility/database.js");

const Motherboard = sequelize.define(
    "Motherboard",
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
        chipset: { type: DataTypes.STRING, allowNull: false },
        maxRamAmount: { type: DataTypes.INTEGER, allowNull: false },
        m2Amount: { type: DataTypes.INTEGER, allowNull: false },
        cpuPins: { type: DataTypes.STRING, allowNull: false },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.brand} ${this.name} ${this.Socket?.name} ${this.chipset}`;
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

module.exports = Motherboard;
