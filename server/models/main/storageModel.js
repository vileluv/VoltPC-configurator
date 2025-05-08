const { DataTypes, col } = require("sequelize");
const sequelize = require("../../utility/database.js");

const Storage = sequelize.define(
    "Storage",
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
        type: { type: DataTypes.STRING, allowNull: false },
        formfactor: { type: DataTypes.FLOAT, allowNull: false },
        memorySize: { type: DataTypes.INTEGER, allowNull: false },
        spindleSpeed: { type: DataTypes.INTEGER, allowNull: true },
        readSpeed: { type: DataTypes.INTEGER, allowNull: true },
        writeSpeed: { type: DataTypes.INTEGER, allowNull: true },
        tbw: { type: DataTypes.INTEGER, allowNull: true },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.brand} ${this.name} ${this.type} ${this.StorageInterface?.name} `;
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

module.exports = Storage;
