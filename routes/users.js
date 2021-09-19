const express = require("express");

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
});

module.exports = router;
