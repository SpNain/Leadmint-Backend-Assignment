const Click = require("../models/Click");
const Campaign = require("../models/Campaign");
const App = require("../models/App");

exports.logClick = async (req, res) => {
  const { campaignId, appId } = req.body;

  if (!campaignId || !appId) {
    return res.status(400).json({ msg: "campaignId and appId are required" });
  }

  try {
    const campaign = await Campaign.findByPk(campaignId);
    const app = await App.findByPk(appId);

    if (!campaign || !app) {
      return res.status(404).json({ msg: "Invalid campaignId or appId" });
    }

    const click = await Click.create({ campaignId, appId });

    res.status(201).json({ msg: "Click logged", click });
  } catch (err) {
    res.status(500).json({ msg: "Failed to log click", error: err.message });
  }
};
