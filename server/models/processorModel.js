const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Processor = sequelize.define(
    "Processor",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        img: { type: DataTypes.STRING, allowNull: false },
        releaseDate: {
            type: DataTypes.DATE,
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
        socket: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        speed: { type: DataTypes.INTEGER, allowNull: false },
        cores: { type: DataTypes.INTEGER, allowNull: false },
        threads: { type: DataTypes.INTEGER, allowNull: false },
        tdp: { type: DataTypes.INTEGER, allowNull: false },
        nanometers: { type: DataTypes.INTEGER, allowNull: false },
        cacheL1: { type: DataTypes.STRING, allowNull: false },
        cacheL2: { type: DataTypes.STRING, allowNull: false },
        cacheL3: { type: DataTypes.STRING, allowNull: false },
        isIntegratedVideo: { type: DataTypes.STRING, allowNull: false },
        integratedVideoName: { type: DataTypes.STRING, allowNull: true },
        postType: { type: DataTypes.STRING, allowNull: false },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.brand} ${this.model} ${this.name} `;
            },
            set(value) {
                console.error("Do not try to set the `fullName` value!");
            },
        },
    },
    { timestamps: false }
);

module.exports = Processor;
