const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");

// Routes
router.post("/register", register);

module.exports = router;
