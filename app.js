const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");

const app = express();
const PORT = 5000 || process.env.PORT;

mongoose.connect("mongodb://localhost/loginregister", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection Error"));
db.once("open", () => {
  console.log("Connected to DB");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "mainLayout" }));
app.set("view engine", "handlebars");

//Router Middleware
app.use(usersRouter);

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.use((req, res) => {
  res.send("404 NOT FOUND");
});
app.listen(PORT, () => {
  console.log("App Started..");
});
