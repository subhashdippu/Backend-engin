const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  scheduleEmail,
  getAllEmails,
} = require("../controllers/emailController");

router.post("/schedule", protect, scheduleEmail);
router.post("/getallmails", protect, getAllEmails);
module.exports = router;
