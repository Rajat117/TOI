const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models").user1;
const keys = require("./keys");
const download = require("image-downloader");
const jwt = require("jsonwebtoken");
const { secret } = require("./secret");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
module.exports = {
  facebookAuth: function(passport) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: keys.fb.CLIENT_ID,
          clientSecret: keys.fb.CLIENT_SECRET,
          callbackURL: "/auth/facebook/callback",
          profileFields: ["id", "displayName", "photos", "email"]
        },
        (accessToken, refreshToken, profile, done) => {
          User.findOne({ fbId: profile.id }).then(currentUser => {
            if (currentUser) {
              console.log("user is: ", currentUser);
              done(null, currentUser);
            } else {
              User.create({
                fbId: profile.id,
                username: profile.displayName,
                email: profile.email
              }).then(newUser => {
                console.log("created new user: ", newUser);
                const options = {
                  url: profile._json.image.url,
                  dest:
                    "C:\\Users\\acer\\Desktop\\TodoFinal\\public\\uploads\\" +
                    newUser.img
                };
                download
                  .image(options)
                  .then(({ filename, image }) => {
                    console.log("File saved to", filename);
                  })
                  .catch(err => {
                    console.error(err);
                  });
                done(null, newUser);
              });
            }
          });
        }
      )
    );
  },
  googleAuth: function(passport) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: keys.google.CLIENT_ID,
          clientSecret: keys.google.CLIENT_SECRET,
          callbackURL: "/google/callback",
          profileFields: ["id", "displayName", "photos", "email"]
        },
        (accessToken, refreshToken, profile, done) => {
          User.findOne({
            where: {
              googleId: profile.id
            }
          }).then(currentUser => {
            console.log(profile);
            if (currentUser) {
              console.log("user is: ", currentUser);
              done(null, currentUser);
            } else {
              console.log(profile._json.email);
              console.log(profile._json.name);

              User.create({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile._json.picture
              })
                .then(newUser => {
                  console.log("created new user: ", newUser);
                  console.log("created new user: ", newUser.email);
                  const options = {
                    url: profile._json.picture,
                    dest:
                      "/Users/rajat/Sites/projects/MiniProjects/TOI/public/uploads/" +
                      newUser.email +
                      ".jpg"
                  };
                  download
                    .image(options)
                    .then(({ filename, image }) => {
                      console.log("File saved to", filename);
                    })
                    .catch(err => {
                      console.error(err);
                    });
                  done(null, newUser);
                })
                .catch(err => console.log(err));
            }
          });
        }
      )
    );
  }
};
