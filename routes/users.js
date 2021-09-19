const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const formValidation = require("../validation/formValidation");
const passport = require("passport");
require("../authentication/passport/local");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("pages/login");
});
router.get("/register", (req, res) => {
  res.render("pages/register");
});
router.post("/login", (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true,
  })(req, res);
});
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const errors = [];
  const validationErrors = formValidation.registerValidation(
    username,
    password
  );
  if (validationErrors.length > 0) {
    return res.render("pages/register", {
      username: username,
      password: password,
      errors: validationErrors,
    });
  }

  User.findOne({
    username: username,
  })
    .then((user) => {
      if (user) {
        //Username Validation
        errors.push({ message: "Username Already In Used!" });
        return res.render("pages/register", {
          username: username,
          password: password,
          errors,
        });
      }
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("B4c0//", salt, function (err, hash) {
          if (err) {
            throw err;
          }
          const newUser = new User({
            username: username,
            password: hash,
          });
          newUser
            .save()
            .then(() => {
              console.log("Succesful");
              req.flash("flashSuccess", "Succesfully Registered"); //index page'e gönderiyoruz
              res.redirect("/");
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
