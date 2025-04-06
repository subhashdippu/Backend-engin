"use strict";

var Agenda = require("agenda");

var nodemailer = require("nodemailer");

var EmailSchedule = require("../models/EmailSchedule");

var SmtpSetting = require("../models/SMTPConfig");

var agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,
    collection: "agendaJobs"
  }
});
agenda.define("sendEmail", function _callee(job) {
  var _job$attrs$data, to, subject, body, userId, emailId, smtp, transporter;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _job$attrs$data = job.attrs.data, to = _job$attrs$data.to, subject = _job$attrs$data.subject, body = _job$attrs$data.body, userId = _job$attrs$data.userId, emailId = _job$attrs$data.emailId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(SmtpSetting.findOne({
            user: userId
          }));

        case 4:
          smtp = _context.sent;

          if (smtp) {
            _context.next = 7;
            break;
          }

          throw new Error("SMTP settings not found for user.");

        case 7:
          if (!(!smtp.auth || !smtp.auth.user || !smtp.auth.pass)) {
            _context.next = 9;
            break;
          }

          throw new Error("Missing SMTP credentials in 'auth' object.");

        case 9:
          transporter = nodemailer.createTransport({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.secure,
            auth: {
              user: smtp.auth.user,
              pass: smtp.auth.pass
            }
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: smtp.auth.user,
            to: to,
            subject: subject,
            html: body
          }));

        case 12:
          console.log("✅ Email sent to:", to);
          _context.next = 15;
          return regeneratorRuntime.awrap(EmailSchedule.findByIdAndUpdate(emailId, {
            sent: true
          }));

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          console.error("❌ Email sending failed:", _context.t0.message);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
});

(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(agenda.start());

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
})();

module.exports = agenda;