const User = require("../models").user1;
const Article = require("../models").article;
const Comment = require("../models").comment;
module.exports = {
  createUser: function(user) {
    console.log(user);
    User.create({
      username: user.username,
      phone: user.phone,
      password: user.pwd1,
      email: user.email
    }).then(result => console.log(result));
  },
  findUser: function(user, cb) {
    User.findOne({
      where: {
        email: user.email
      }
    }).then(result => {
      cb(result);
    });
  },
  createArticle: function(user) {
    console.log(user);
    console.log(user.body.email);
    Article.create({
      header: user.body.header,
      desc: user.body.body,
      author: user.body.email,
      tag: user.body.tag,
      photo: user.file.filename
    }).then(result => console.log(result));
  },
  createComment: function(cmt, id, cb) {
    console.log(cmt.email);
    Comment.create({
      name: cmt.name,
      email: cmt.email,
      desc: cmt.body,
      articleId: id
    }).then(result => {
      console.log(result);
      cb(result);
    });
  },
  findComment: function(id, cb) {
    Comment.findAll({
      where: {
        articleId: id
      }
    }).then(result => {
      cb(result);
    });
  },
  deleteComment: function(id, cb) {
    Comment.destroy({
      where: {
        id: id
      }
    }).then(result => cb(result));
  },
  findArticle: function(tag, cb) {
    Article.findAll({
      where: {
        tag: tag
      }
    }).then(result => {
      cb(result);
    });
  },
  findSpecificArticle: function(id, cb) {
    Article.findOne({
      where: {
        id: id
      }
    }).then(result => {
      cb(result);
    });
  }
};
