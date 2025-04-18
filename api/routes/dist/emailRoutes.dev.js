"use strict";

var express = require("express");

var router = express.Router();

var protect = require("../middleware/auth");

var _require = require("../controllers/emailController"),
    scheduleEmail = _require.scheduleEmail,
    getAllEmails = _require.getAllEmails,
    getEmailById = _require.getEmailById,
    deleteEmail = _require.deleteEmail;

router.post("/schedule", protect, scheduleEmail);
router.get("/", protect, getAllEmails);
router.get("/:id", protect, getEmailById);
router["delete"]("/:id", protect, deleteEmail);
module.exports = router;