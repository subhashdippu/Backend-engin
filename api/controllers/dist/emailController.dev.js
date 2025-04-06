"use strict";

var Email = require("../models/EmailSchedule");

var agenda = require("../utils/agenda");

var scheduleEmail = function scheduleEmail(req, res) {
  var _req$body, to, subject, body, sendAt, email;

  return regeneratorRuntime.async(function scheduleEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, to = _req$body.to, subject = _req$body.subject, body = _req$body.body, sendAt = _req$body.sendAt;

          if (!(!to || !subject || !body || !sendAt)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Missing required fields"
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(Email.create({
            user: req.user._id,
            to: to,
            subject: subject,
            body: body,
            sendAt: sendAt
          }));

        case 6:
          email = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(agenda.schedule(new Date(sendAt), "sendEmail", {
            userId: req.user._id,
            from: req.user.email,
            to: to,
            subject: subject,
            body: body,
            emailId: email._id.toString()
          }));

        case 9:
          res.status(201).json({
            message: "Email scheduled",
            email: email
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.error("📧 Schedule error:", _context.t0);
          res.status(500).json({
            message: "Internal Server Error"
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
};

module.exports = {
  scheduleEmail: scheduleEmail
};