"use strict";

var express = require("express");

var bcrypt = require("bcryptjs");

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

module.exports = {
  register: register
};