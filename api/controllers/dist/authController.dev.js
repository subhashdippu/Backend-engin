"use strict";

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var User = require("../models/User");

var register = function register(req, res) {
  var _req$body, name, email, password, exists, hash, user;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

          if (!(!name || !email || !password)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Missing fields"
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          exists = _context.sent;

          if (!exists) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "User already exists"
          }));

        case 8:
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 11:
          hash = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: hash
          }));

        case 14:
          user = _context.sent;
          res.status(201).json({
            message: "Registered successfully"
          });
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](8);
          console.error("Registration error:", _context.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 18]]);
};

var login = function login(req, res) {
  var _req$body2, email, password, user, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          user = _context2.sent;
          _context2.t0 = !user;

          if (_context2.t0) {
            _context2.next = 9;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 8:
          _context2.t0 = !_context2.sent;

        case 9:
          if (!_context2.t0) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: "Invalid credentials"
          }));

        case 11:
          try {
            token = jwt.sign({
              id: user._id
            }, process.env.JWT_SECRET, {
              expiresIn: "1d"
            });
            res.json({
              token: token
            });
          } catch (err) {
            console.error("Login error:", err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  register: register,
  login: login
};