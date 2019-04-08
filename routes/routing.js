const express = require("express");
const router = express.Router();
const passport = require("passport");
const { generatejwt, verifyjwt } = require("../config/jwt");
const task = require("../controller/operations");

router.get("/login", task.login);
router.get("/register", verifyjwt, task.register);
router.post("/register", task.addUser);
router.get("/", task.home);
router.get("/topic/:tag", task.showTopic);
router.get("/article/:id", task.showArticle);
router.post("/registerRedirect", task.redirect);
router.get("/publish", verifyjwt, task.publishArticle);
router.post("/publish", task.storeArticle);
router.post("/comment/:id", task.storeComment);
router.delete("/delete/:id", task.deleteComment);
router.post("/login", task.letLogin);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["profile"]
  })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    console.log(req.user);
  }
);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "https://www.googleapis.com/auth/userinfo.email"]
  })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  generatejwt(req, res, token => {
    req.token = token;
    console.log(token);
    res.cookie("accessToken", token, {
      maxAge: 84600,
      httpOnly: true
    });
    console.log(token);
    console.log(req.headers);
    res.render("Home");
  });
});
module.exports = router;
