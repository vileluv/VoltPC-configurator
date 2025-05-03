const { DataTypes } = require("sequelize");
const sequelize = require("../../utility/database.js");

const CaseFormFactor = sequelize.define(
    "CaseFormFactor",
    {
        CaseId: { type: DataTypes.INTEGER, allowNull: false },
        FormFactorId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
);
module.exports = CaseFormFactor;
