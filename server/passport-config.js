const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");

function initialize(passport, storage) {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      if (await storage.keys().includes(email)) {
        let user = storage.getItem(email);

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, email);
          } else {
            return done(null, false);
          }
        });
      } else {
        return done(null, false);
      }
    })
  );

  passport.serializeUser((email, cb) => {
    cb(null, email);
  });
  passport.deserializeUser(async (email, cb) => {
    let user = await storage.getItem(email);
    cb(err, user);
  });
}

// function initialize(passport, getUserByEmail) {
//   const authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email);

//     if (user == null) {
//       return done(null, false, { message: "User not found." });
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "Incorrect password." });
//       }
//     } catch (err) {
//       done(err);
//     }
//   };

//   passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

//   passport.serializeUser((user, done) => {});
//   passport.deserializeUser((user, done) => {});
// }

module.exports = initialize;
