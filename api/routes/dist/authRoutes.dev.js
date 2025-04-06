"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/authController"),
    register = _require.register; // Routes


router.post("/register", register);
module.exports = router;