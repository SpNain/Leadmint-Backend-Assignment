const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const authenticate = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const multer = require("multer");

const upload = multer();

router.post(
  "/",
  authenticate,
  checkRole("advertiser"),
  upload.fields([{ name: "logo" }, { name: "banner" }]),
  campaignController.createCampaign
);

router.put(
  "/:id",
  authenticate,
  checkRole("advertiser"),
  upload.fields([{ name: "logo" }, { name: "banner" }]),
  campaignController.editCampaign
);

module.exports = router;
