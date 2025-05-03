const { DataTypes, col } = require("sequelize");
const sequelize = require("../../utility/database.js");

const Case = sequelize.define(
    "Case",
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
        typefactor: { type: DataTypes.STRING, allowNull: false },
        maxCoolerHeight: { type: DataTypes.INTEGER, allowNull: false },
        maxVideocardHeight: { type: DataTypes.INTEGER, allowNull: false },
        sizes: { type: DataTypes.STRING, allowNull: false },
        weight: { type: DataTypes.INTEGER, allowNull: false },
        max25Inch: { type: DataTypes.INTEGER, allowNull: false },
        max35Inch: { type: DataTypes.INTEGER, allowNull: false },
        maxFans: { type: DataTypes.INTEGER, allowNull: false },
        fansSize: { type: DataTypes.INTEGER, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false },
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

module.exports = Case;
