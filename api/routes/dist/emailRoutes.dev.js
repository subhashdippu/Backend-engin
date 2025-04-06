"use strict";

var express = require("express");

var router = express.Router();

var protect = require("../middleware/auth");

var _require = require("../controllers/emailController"),
    scheduleEmail = _require.scheduleEmail;

router.post("/schedule", protect, scheduleEmail);
module.exports = router;