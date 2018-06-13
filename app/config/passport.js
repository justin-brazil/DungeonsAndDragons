var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var db = require("../models");
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.findOne({ username: username }, function(err, dbUser) {
      if (err) { return done(err); }
      if (!dbUser) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!dbUser.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, dbUser);
    });
  }
));

// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var db = require("../models");

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       db.User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));

// // In order to help keep authentication state across HTTP requests,
// // Sequelize needs to serialize and deserialize the user
// // Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// // Exporting our configured passport
module.exports = passport;