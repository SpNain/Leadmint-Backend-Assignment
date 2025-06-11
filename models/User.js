const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  mobile: DataTypes.STRING,
  role: DataTypes.ENUM("publisher", "advertiser"),
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  otp: DataTypes.STRING,
});

module.exports = User;
