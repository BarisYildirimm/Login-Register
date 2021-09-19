const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const User = require("./models/Users");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();
const PORT = 5000 || process.env.PORT;

//Flash Middleware
app.use(cookieParser("loginregister"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    resave: true,
    secret: "loginregister",
    saveUninitialized: true,
  })
);
app.use(flash());
//passport initialize
app.use(passport.initialize());
app.use(passport.session());

//Global Res.Locals
app.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("flashSuccess");
  res.locals.flashError = req.flash("flashError");

  //passport flash
  res.locals.passportFailure = req.flash("error");
  res.locals.passportSuccess = req.flash("success");

  res.locals.user = req.user;

  next();
});

mongoose.connect("mongodb://localhost/loginregister", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection Error"));
db.once("open", () => {
  console.log("Connected to DB");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "mainLayout",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

//Router Middleware
app.use(usersRouter);

app.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      res.render("pages/index", {
        users: users,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.send("404 NOT FOUND");
});
app.listen(PORT, () => {
  console.log("App Started..");
});
