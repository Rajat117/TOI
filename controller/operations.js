const db = require("./data");
const User = require("../models").user1;
const { generatejwt } = require("../config/jwt");
const { validateUser } = require("../config/validate");
var upload = require("../config/multer");

module.exports = {
  login: function(req, res) {
    res.render("login");
  },
  letLogin: function(req, res) {
    console.log(req.body);
    db.findUser(req.body, result => {
      if (result) {
        if (result.password === req.body.password) {
          console.log("d------------------sd");
          generatejwt(req, res, result => {
            res.json({
              email: req.body.email,
              token: result
            });
          });
        } else {
          res.json({
            msg: "Invalid credentials"
          });
        }
      } else {
        res.json({
          msg: "Invalid Request"
        });
      }
    });
  },
  register: function(req, res) {
    res.render("register");
  },
  home: function(req, res) {
    res.render("home");
  },
  redirect: function(req, res) {
    console.log(req.body);
    db.findUser(req.body, result => {
      if (result) {
        res.render("login", {
          flag: true,
          email: result.email
        });
      } else {
        res.render("register", {
          email: req.body.email
        });
      }
    });
  },
  addUser: function(req, res) {
    console.log(req.body);
    var errors = [];
    var code = [];
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      validateUser(user, req.body, errors, code, () => {
        if (code.length > 0) {
          console.log(errors);
          console.log(code);
          res.json({
            msg: "please Fill Whole Details"
          });
          // res.render("register", {
          //   errors,
          //   code,
          //   logger: req.user
          // });
        } else {
          db.createUser(req.body);
          generatejwt(req, res, token => {
            console.log(res);
            console.log("addUser", token);
            res.cookie("accessToken", token, { maxAge: 3600, httpOnly: true });
            res.json({
              email: req.body.email,
              token: token
            });
          });
        }
      });
    });
  },
  showTopic: function(req, res) {
    console.log(req.params);
    db.findArticle(req.params.tag, results => {
      console.log("showTopic---------------showTopic", results);
      res.render("world", {
        results,
        tag: req.params.tag
      });
    });
  },
  showArticle: function(req, res) {
    db.findSpecificArticle(req.params.id, result => {
      db.findComment(req.params.id, comments => {
        res.render("article", {
          result,
          comments
        });
      });
    });
  },
  publishArticle: function(req, res) {
    res.render("publish");
  },
  storeArticle: function(req, res) {
    console.log(req.body);
    upload(req, res, err => {
      if (err) {
        console.log(err);
      } else {
        if (req.file == undefined) {
          console.log("undefined");
        } else {
          db.createArticle(req);
        }
      }
    });
  },
  storeComment: function(req, res) {
    console.log(req.params.id);
    console.log(req.body);
    db.createComment(req.body, req.params.id, result => {
      res.redirect("/article/" + req.params.id);
    });
  },
  deleteComment: function(req, res) {
    console.log("--------000000--------", req.params.id);
    db.deleteComment(req.params.id, result => {
      res.json(result);
    });
  }
};
