const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, db) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        let emails = await db.keys();
        if (emails.includes(email)) {
          let user = await db.getItem(email);

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              let userObj = {
                userEmail: email,
                username: user.username,
                password: user.password,
              };
              return done(null, userObj);
            } else {
              return done(null, false);
            }
          });
        } else {
          return done(null, false);
        }
      }
    )
  );

  passport.serializeUser(function (userObj, cb) {
    process.nextTick(function () {
      return cb(null, {
        email: userObj.userEmail,
        username: userObj.username,
        password: userObj.password,
      });
    });
  });

  passport.deserializeUser(function (userObj, cb) {
    process.nextTick(function () {
      return cb(null, userObj);
    });
  });

  passport.serializeUser((userObj, done) => {
    done(null, userObj.userEmail);
  });

  passport.deserializeUser(async (userEmail, done) => {
    let user = await storage.getItem(userEmail);
    done(err, user);
  });
}

module.exports = initialize;
