const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database.js");
const { userRoles } = require("../utility/constants.js");

const User = sequelize.define(
    "User",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        login: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        role: { type: DataTypes.STRING, defaultValue: userRoles.USER },
    },
    { timestamps: false }
);

module.exports = User;
