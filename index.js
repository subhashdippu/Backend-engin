require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./api/config/db");

// Correct route imports:
const authRoutes = require("./api/routes/authRoutes");
const smtpRoutes = require("./api/routes/smtpRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/auth", smtpRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
