"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var connectDB = require("./api/config/db"); // Correct route imports:


var authRoutes = require("./api/routes/authRoutes");

var app = express();
app.use(cors());
app.use(express.json()); // Connect DB

connectDB(); // Mount routes

app.use("/api/auth", authRoutes);
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  return console.log("\uD83D\uDE80 Listening on port ".concat(PORT));
});