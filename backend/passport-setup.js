require("dotenv").config();
const passport = require("passport/lib");
const GoogleStrategy = require("passport-google-oauth20/lib").Strategy;

passport.deserializeUser((user, done) => {
  console.log("deserializeUsers");
  // cek ke database
  //   User.findById(user, (err, user) => {
  //     done(err, user);
  //   });
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3001/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("new GoogleStrategy");
      // input ke database
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser");
  // done(null, user,id);
  done(null, user);
});
