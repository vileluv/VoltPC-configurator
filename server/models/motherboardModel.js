const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Motherboard = sequelize.define(
    "Motherboard",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                const value = this.getDataValue("releaseDate");
                return new Date(value).getDate();
            },
            set(value) {
                this.setDataValue("releaseDate", new Date(value));
            },
        },
        socket: { type: DataTypes.STRING, allowNull: false },
        chipset: { type: DataTypes.STRING, allowNull: false },
        formfactor: { type: DataTypes.STRING, allowNull: false },
        ramType: { type: DataTypes.STRING, allowNull: false },
        maxRamAmount: { type: DataTypes.INTEGER, allowNull: false },
        m2Amount: { type: DataTypes.INTEGER, allowNull: false },
        cpuPins: { type: DataTypes.STRING, allowNull: false },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.brand} ${this.name} ${this.socket} ${this.chipset}`;
            },
            set(value) {
                console.error("Do not try to set the `fullName` value!");
            },
        },
    },
    { timestamps: false }
);

module.exports = Motherboard;
