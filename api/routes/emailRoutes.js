const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { scheduleEmail } = require("../controllers/emailController");

router.post("/schedule", protect, scheduleEmail);
module.exports = router;
