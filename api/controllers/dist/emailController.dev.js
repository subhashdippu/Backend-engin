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

var getAllEmails = function getAllEmails(req, res) {
  var emails;
  return regeneratorRuntime.async(function getAllEmails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Email.find({
            user: req.user._id
          }).sort({
            sendAt: -1
          }));

        case 2:
          emails = _context2.sent;
          res.json(emails);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getEmailById = function getEmailById(req, res) {
  var email;
  return regeneratorRuntime.async(function getEmailById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Email.findOne({
            _id: req.params.id,
            user: req.user._id
          }));

        case 2:
          email = _context3.sent;

          if (email) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Not found"
          }));

        case 5:
          res.json(email);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var deleteEmail = function deleteEmail(req, res) {
  var email;
  return regeneratorRuntime.async(function deleteEmail$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Email.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
          }));

        case 2:
          email = _context4.sent;

          if (email) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Not found"
          }));

        case 5:
          res.json({
            message: "Deleted",
            email: email
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  scheduleEmail: scheduleEmail,
  getAllEmails: getAllEmails,
  getEmailById: getEmailById,
  deleteEmail: deleteEmail
};