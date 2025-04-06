const Agenda = require("agenda");
const nodemailer = require("nodemailer");
const EmailSchedule = require("../models/EmailSchedule");
const SmtpSetting = require("../models/SMTPConfig");

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: "agendaJobs" },
});

agenda.define("sendEmail", async (job) => {
  const { to, subject, body, userId, emailId } = job.attrs.data;

  try {
    const smtp = await SmtpSetting.findOne({ user: userId });
    if (!smtp) throw new Error("SMTP settings not found for user.");

    // Validate that auth user/pass are present
    if (!smtp.auth || !smtp.auth.user || !smtp.auth.pass) {
      throw new Error("Missing SMTP credentials in 'auth' object.");
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.auth.user,
        pass: smtp.auth.pass,
      },
    });

    await transporter.sendMail({
      from: smtp.auth.user,
      to,
      subject,
      html: body,
    });

    console.log("✅ Email sent to:", to);
    await EmailSchedule.findByIdAndUpdate(emailId, { sent: true });
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }
});

(async () => {
  await agenda.start();
})();

module.exports = agenda;
