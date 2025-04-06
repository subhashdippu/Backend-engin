const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    sendAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "sent", "failed"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", EmailSchema);
