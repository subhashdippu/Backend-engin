const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  scheduleEmail,
  getAllEmails,
  getEmailById,
  deleteEmail,
} = require("../controllers/emailController");

router.post("/schedule", protect, scheduleEmail);
router.get("/", protect, getAllEmails);
router.get("/:id", protect, getEmailById);
router.delete("/:id", protect, deleteEmail);

module.exports = router;
