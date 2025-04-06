"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var connectDB = require("./api/config/db");

require("./api/jobs/emailJob"); // register job definitions
// Correct route imports:


var authRoutes = require("./api/routes/authRoutes");

var emailRoutes = require("./api/routes/emailRoutes");

var smtpRoutes = require("./api/routes/smtpRoutes");

var app = express();
app.use(cors());
app.use(express.json()); // Connect DB and start Agenda

connectDB(); // Mount routes

app.use("/api/auth", authRoutes);
app.use("/auth", smtpRoutes);
app.use("/api", emailRoutes);
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  return console.log("\uD83D\uDE80 Listening on port ".concat(PORT));
});