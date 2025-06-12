const Campaign = require("../models/Campaign");
const { uploadToS3 } = require("../services/awsService");

exports.createCampaign = async (req, res) => {
  try {
    const {
      appId,
      campaignName,
      appPackageName,
      link,
      bidPrice,
      dailyBudget,
      dailyConversion,
    } = req.body;

    let logoUrl = req.body.logo;
    let bannerUrl = req.body.banner;

    if (req.files?.logo) {
      logoUrl = await uploadToS3(req.files.logo[0]);
    }

    if (req.files?.banner) {
      bannerUrl = await uploadToS3(req.files.banner[0]);
    }

    const campaign = await Campaign.create({
      appId,
      campaignName,
      appPackageName,
      link,
      logo: logoUrl,
      banner: bannerUrl,
      bidPrice,
      dailyBudget,
      dailyConversion,
    });

    res.status(201).json({ msg: "Campaign created", campaign });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create campaign", error: err.message });
  }
};

exports.editCampaign = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      campaignName,
      appPackageName,
      link,
      bidPrice,
      dailyBudget,
      dailyConversion,
    } = req.body;

    const campaign = await Campaign.findByPk(id);
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });

    if (req.files?.logo) {
      campaign.logo = await uploadToS3(req.files.logo[0]);
    }

    if (req.files?.banner) {
      campaign.banner = await uploadToS3(req.files.banner[0]);
    }

    campaign.campaignName = campaignName || campaign.campaignName;
    campaign.appPackageName = appPackageName || campaign.appPackageName;
    campaign.link = link || campaign.link;
    campaign.bidPrice = bidPrice || campaign.bidPrice;
    campaign.dailyBudget = dailyBudget || campaign.dailyBudget;
    campaign.dailyConversion = dailyConversion || campaign.dailyConversion;

    await campaign.save();

    res.json({ msg: "Campaign updated", campaign });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update campaign", error: err.message });
  }
};
