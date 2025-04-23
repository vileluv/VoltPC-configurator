const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");

const Power = sequelize.define(
    "Power",
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
    },
    { timestamps: false }
);

module.exports = Power;
