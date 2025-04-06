"use strict";

var SMTPConfig = require("../models/SMTPConfig");

var getUserSMTPConfig = function getUserSMTPConfig(userId) {
  var config;
  return regeneratorRuntime.async(function getUserSMTPConfig$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(SMTPConfig.findOne({
            user: userId
          }));

        case 2:
          config = _context.sent;

          if (config) {
            _context.next = 5;
            break;
          }

          throw new Error("You must set up your SMTP credentials first via /auth/smtp-setup");

        case 5:
          return _context.abrupt("return", {
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = getUserSMTPConfig;