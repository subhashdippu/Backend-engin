const Email = require("../models/EmailSchedule");
const agenda = require("../utils/agenda");

const scheduleEmail = async (req, res) => {
  const { to, subject, body, sendAt } = req.body;

  if (!to || !subject || !body || !sendAt)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const email = await Email.create({
      user: req.user._id,
      to,
      subject,
      body,
      sendAt,
    });

    await agenda.schedule(new Date(sendAt), "sendEmail", {
      userId: req.user._id,
      from: req.user.email,
      to,
      subject,
      body,
      emailId: email._id.toString(),
    });

    res.status(201).json({ message: "Email scheduled", email });
  } catch (err) {
    console.error("📧 Schedule error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  scheduleEmail,
};
