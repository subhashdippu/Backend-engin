const mongoose = require("mongoose");

const smtpSettingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  host: { type: String, required: true },
  port: { type: Number, required: true },
  secure: { type: Boolean, required: true },
  auth: {
    user: { type: String, required: true },
    pass: { type: String, required: true },
  },
});

module.exports = mongoose.model("SmtpSetting", smtpSettingSchema);
