const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/Users");

passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err, null, "Bir hata oluştu");
      if (!user) {
        return done(null, false, "User Not Found");
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          //req.user
          return done(null, user, "Successfuly Logged In");
        } else {
          return done(null, false, "Incorrect Password");
        }
      });
    });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
