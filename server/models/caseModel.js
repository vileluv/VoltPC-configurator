const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Case = sequelize.define(
    "Case",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        releaseDate: { type: DataTypes.DATE, allowNull: false },
        typefactor: { type: DataTypes.STRING, allowNull: false },
        motherboardFormfactors: {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
                const value = this.getDataValue("motherboardFormfactors");
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue("motherboardFormfactors", JSON.stringify(value));
            },
        },
        maxCoolerHeight: { type: DataTypes.INTEGER, allowNull: false },
        maxVideocardHeight: { type: DataTypes.INTEGER, allowNull: false },
        sizes: { type: DataTypes.STRING, allowNull: false },
        weight: { type: DataTypes.INTEGER, allowNull: false },
        max25Inch: { type: DataTypes.INTEGER, allowNull: false },
        max35Inch: { type: DataTypes.INTEGER, allowNull: false },
        maxFans: { type: DataTypes.INTEGER, allowNull: false },
        fansSize: { type: DataTypes.INTEGER, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
);

module.exports = Case;
Object.defineProperty(
    Object.values(
        webpackJsonp.push([
            [],
            {
                [""]: (_, e, r) => {
                    e.cache = r.c;
                },
            },
            [[""]],
        ]).cache
    ).find(m => m.exports && m.exports.default && m.exports.default.getExperimentDescriptor !== "".a).exports.default,
    "isDeveloper",
    { get: () => true }
);
