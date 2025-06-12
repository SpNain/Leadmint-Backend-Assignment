const App = require("../models/App");
const gplay = require("google-play-scraper").default;
const { uploadToS3 } = require("../services/awsService");

exports.searchApps = async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ msg: "Query is required" });

  try {
    const results = await gplay.search({
      term: query,
      num: 10,
      country: "in",
      lang: "en",
    });

    const apps = results.map(app => ({
      appName: app.title,
      logo: app.icon,
      packageName: app.appId,
      link: `https://play.google.com/store/apps/details?id=${app.appId}`,
    }));

    res.json(apps);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch apps", error: err.message });
  }
};

exports.addApp = async (req, res) => {
  const { appName, packageName, link, coinName, coinValue, postback } = req.body;
  const logoFile = req.file;
  const userId = req.user.id;

  try {
    let logoUrl = req.body.logo;
    if (logoFile) {
      logoUrl = await uploadToS3(logoFile);
    }

    const newApp = await App.create({
      appName,
      packageName,
      link,
      logo: logoUrl,
      coinName,
      coinValue,
      postback,
      userId,
    });

    res.status(201).json({ msg: "App added successfully", app: newApp });
  } catch (err) {
    res.status(500).json({ msg: "Failed to add app", error: err.message });
  }
};

exports.countApps = async (req, res) => {
  try {
    const count = await App.count({ where: { userId: req.user.id } });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ msg: "Failed to count apps", error: err.message });
  }
};
