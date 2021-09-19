const express = require("express");
const formValidation = require("../validation/formValidation");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("pages/login");
});
router.get("/register", (req, res) => {
  res.render("pages/register");
});
router.post("/login", (req, res) => {
  res.send("Login Tıklandı.");
});
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
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
  res.send("register Tıklandı...");
});

module.exports = router;
