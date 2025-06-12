const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticate = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const appController = require("../controllers/appController");

const upload = multer();

router.get("/search", appController.searchApps);
router.post("/", authenticate, upload.single("logo"), appController.addApp);
router.get("/count", authenticate, checkRole("publisher"), appController.countApps);

module.exports = router;

