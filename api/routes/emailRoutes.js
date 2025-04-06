const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  scheduleEmail,
  getAllEmails,
  getEmailById,
} = require("../controllers/emailController");

router.post("/schedule", protect, scheduleEmail);
router.get("/", protect, getAllEmails);
router.get("/:id", protect, getEmailById);

module.exports = router;
