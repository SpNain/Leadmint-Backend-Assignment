const express = require("express");
const router = express.Router();
const clickController = require("../controllers/clickController");

router.post("/", clickController.logClick);

module.exports = router;
