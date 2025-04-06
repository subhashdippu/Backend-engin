"use strict";

var express = require("express");

var router = express.Router();

var protect = require("../middleware/auth");

var _require = require("../controllers/emailController"),
    scheduleEmail = _require.scheduleEmail,
    getAllEmails = _require.getAllEmails;

router.post("/schedule", protect, scheduleEmail);
router.post("/getallmails", protect, getAllEmails);
module.exports = router;