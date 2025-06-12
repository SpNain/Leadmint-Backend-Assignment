const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Click = sequelize.define("Click", {
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Click;
