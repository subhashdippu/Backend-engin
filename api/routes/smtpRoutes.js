const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { setupSMTP } = require("../controllers/smtpController");

router.post("/smtp-setup", protect, setupSMTP);

module.exports = router;
