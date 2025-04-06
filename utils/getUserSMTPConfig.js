const SMTPConfig = require("../models/SMTPConfig");

const getUserSMTPConfig = async (userId) => {
  const config = await SMTPConfig.findOne({ user: userId });
  if (!config)
    throw new Error(
      "You must set up your SMTP credentials first via /auth/smtp-setup"
    );

  return {
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };
};

module.exports = getUserSMTPConfig;
