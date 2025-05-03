const { DataTypes } = require("sequelize");
const sequelize = require("../../utility/database.js");

const CoolerSocket = sequelize.define(
    "CoolerSocket",
    {
        CoolerId: { type: DataTypes.INTEGER, allowNull: false },
        SocketId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
);
module.exports = CoolerSocket;
