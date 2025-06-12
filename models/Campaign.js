const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Campaign = sequelize.define("Campaign", {
  campaignName: DataTypes.STRING,
  appPackageName: DataTypes.STRING,
  link: DataTypes.STRING,
  logo: DataTypes.STRING,
  banner: DataTypes.STRING,
  bidPrice: DataTypes.FLOAT,
  dailyBudget: DataTypes.FLOAT,
  dailyConversion: DataTypes.INTEGER,
});

module.exports = Campaign;
