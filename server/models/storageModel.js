const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Storage = sequelize.define(
    "Storage",
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
        type: { type: DataTypes.STRING, allowNull: false },
        formfactor: { type: DataTypes.FLOAT, allowNull: false },
        interface: { type: DataTypes.STRING, allowNull: false },
        memorySize: { type: DataTypes.INTEGER, allowNull: false },
        spindleSpeed: { type: DataTypes.INTEGER, allowNull: true },
        readSpeed: { type: DataTypes.INTEGER, allowNull: true },
        writeSpeed: { type: DataTypes.INTEGER, allowNull: true },
        tbw: { type: DataTypes.INTEGER, allowNull: true },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.brand} ${this.model} ${this.type} `;
            },
            set(value) {
                console.error("Do not try to set the `fullName` value!");
            },
        },
    },
    { timestamps: false }
);

module.exports = Storage;
