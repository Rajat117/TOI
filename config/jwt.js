const User = require("../models").user1;
const jwt = require("jsonwebtoken");
const { secret } = require("./secret");
module.exports = {
  generatejwt: function(req, res, cb) {
    console.log("dvvvvvfvfv", req.body);
    var token = jwt.sign(
      { username: req.username },
      secret,
      {
        expiresIn: "24h"
      },
      (err, token) => {
        cb(token);
      }
    );
  },
  verifyjwt: function(req, res, next) {
    token = req.headers.cookie;
    console.log(token);
    console.log("ccd", req.headers);
    if (token) {
      if (token.startsWith("accessToken")) {
        token = token.slice(12, token.length);
      }
      console.log(token);
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return false;
        } else {
          console.log("decoded");
          req.decoded = decoded;
          next();
        }
      });
    } else {
      console.log("no decoded");
      return res.redirect();
    }
  }
};
