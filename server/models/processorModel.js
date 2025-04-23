const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Processor = sequelize.define(
    "Processor",
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
        model: { type: DataTypes.STRING, allowNull: false },
        speed: { type: DataTypes.INTEGER, allowNull: false },
        cores: { type: DataTypes.INTEGER, allowNull: false },
        threads: { type: DataTypes.INTEGER, allowNull: false },
        tdp: { type: DataTypes.INTEGER, allowNull: false },
        nanometers: { type: DataTypes.INTEGER, allowNull: false },
        cacheL1: { type: DataTypes.STRING, allowNull: false },
        cacheL2: { type: DataTypes.STRING, allowNull: false },
        cacheL3: { type: DataTypes.STRING, allowNull: false },
        isIntegratedVideo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            get() {
                const value = this.getDataValue("isIntegratedVideo");
                return value ? "Да" : "Нет";
            },
            set(value) {
                this.setDataValue("isIntegratedVideo", value);
            },
        },
        integratedVideoName: { type: DataTypes.STRING, allowNull: true },
        postType: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
);

module.exports = Processor;
