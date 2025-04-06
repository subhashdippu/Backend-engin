const SmtpSetting = require("../models/SMTPConfig");

const setupSMTP = async (req, res) => {
  const { host, port, secure, auth } = req.body;

  if (!host || !port || secure === undefined || !auth?.user || !auth?.pass) {
    return res.status(400).json({ message: "All SMTP fields are required" });
  }

  try {
    await SmtpSetting.findOneAndUpdate(
      { user: req.user._id },
      { host, port, secure, auth },
      { upsert: true, new: true }
    );
    res.json({ message: "SMTP credentials saved successfully" });
  } catch (err) {
    console.error("SMTP Save Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  setupSMTP,
};
