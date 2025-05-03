const { DataTypes } = require("sequelize");
const sequelize = require("../../utility/database.js");
const { userRoles } = require("../../utility/constants.js");

const User = sequelize.define(
    "User",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        login: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, defaultValue: userRoles.USER, allowNull: false },
        confcode: { type: DataTypes.STRING, allowNull: true },
    },
    { timestamps: false }
);

module.exports = User;
