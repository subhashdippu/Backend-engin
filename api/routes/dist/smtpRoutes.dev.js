"use strict";

var express = require("express");

var router = express.Router();

var protect = require("../middleware/auth");

var _require = require("../controllers/smtpController"),
    setupSMTP = _require.setupSMTP;

router.post("/smtp-setup", protect, setupSMTP);
module.exports = router;