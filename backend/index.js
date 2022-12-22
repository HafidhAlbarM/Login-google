const express = require("express");
const app = express();
const cors = require("cors/lib");
const bodyParser = require("body-parser");
const passport = require("passport/lib");
const cookieSession = require("cookie-session");

require("./passport-setup");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "login-google-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Anda tidak login");
});

app.get("/failed", (req, res) => {
  res.send("Anda gagal login");
});

app.get("/good", isLoggedIn, (req, res) => {
  res.send(`${req.user.displayName} berhasil login!`);
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    failureMessage: true,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect("https://accounts.google.com/logout");
});

app.listen(3001, () => {
  console.log("listening on PORT 3001");
});
