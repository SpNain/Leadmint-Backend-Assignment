const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

// Models
const User = require("./models/User");
const App = require("./models/App");
const Campaign = require("./models/Campaign");

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const appRoutes = require("./routes/appRoutes");
app.use("/api/apps", appRoutes);

const campaignRoutes = require("./routes/campaignRoutes");
app.use("/api/campaigns", campaignRoutes);

// Associations
App.belongsTo(User, { foreignKey: "userId" });
Campaign.belongsTo(App, { foreignKey: "appId" });

async function initiate() {
  try {
    // await sequelize.sync({ force: true })
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("error", err);
  }
}

initiate();
