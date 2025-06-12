const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const App = sequelize.define("App", {
  appName: DataTypes.STRING,
  logo: DataTypes.STRING, // S3 or direct URL
  packageName: DataTypes.STRING,
  link: DataTypes.STRING,
  coinName: DataTypes.STRING,
  coinValue: DataTypes.FLOAT,
  postback: DataTypes.STRING,
});


module.exports = App;