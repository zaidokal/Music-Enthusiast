const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const parser = require("./parser");
const stringSimilarity = require("string-similarity");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const Validator = require("validatorjs");

// Initialize database.
const storage = require("node-persist");
storage.init({
  dir: "db",
  stringify: JSON.stringify,
  parse: JSON.parse,
  encoding: "utf8",
});

router.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: false,
  })
);

router.use(cookieParser("secretcode"));
router.use(passport.initialize());
router.use(passport.session());
require("./passport-config")(passport, storage);

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "rakhshantest@gmail.com",
    pass: "ebnegegctcgtzvpv",
  },
});

// Get the parsed arrays.
const parseResults = parser();

router.use((req, res, next) => {
  console.log("Time: " + Date.now());
  next();
});

router.use("/", express.static("client"));

// Get all available genre names, IDs and parent IDs.
router.get("/genres", (req, res) => {
  res.send(
    parseResults.genres.map((data) => {
      return {
        genre_id: data.genre_id,
        parent: data.parent,
        title: data.title,
      };
    })
  );
});

// Get the artist details (at least 6 key attributes) given an artist ID.
router.get("/artists/:id", (req, res) => {
  if (!isNaN(req.params.id)) {
    res.send(
      parseResults.artists
        .filter((artist) => artist.artist_id == req.params.id)
        .map((data) => {
          return {
            artist_id: data.artist_id,
            artist_name: data.artist_name,
            artist_active_year_begin: data.artist_active_year_begin,
            artist_active_year_end: data.artist_active_year_end,
            artist_associated_labels: data.artist_associated_labels,
            artist_contact: data.artist_contact,
            artist_members: data.artist_members,
          };
        })
    );
  }
});

// Get all the matching artist IDs for a given search pattern matching the artist's name.
router.get("/artists", (req, res) => {
  const { artistName } = req.query;

  let results = [...parseResults.artists];

  if (artistName) {
    results = results.filter((artist) =>
      artist.artist_name.toLowerCase().includes(artistName.toLowerCase())
    );
  }

  res.send(
    results.map((data) => {
      return {
        artist_id: data.artist_id,
      };
    })
  );
});

// ----- Authentication ----- api/auth ? -

// POST request to create account
router.post("/auth/accounts", async (req, res) => {
  let user = await storage.getItem(req.body.email);

  const verificationToken = (Math.random() * 1e32)
    .toString(16)
    .substring(0, 20);

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let data = {
      email: req.body.email,
    };

    let rules = {
      email: "email",
    };

    let validation = new Validator(data, rules);

    if (user) {
      res.send("An account with this email already exists.");
    } else {
      if (validation.passes()) {
        storage
          .setItem(req.body.email, {
            username: req.body.username,
            password: hashedPassword,
            deactivated: false,
            admin: false,
            verified: false,
            verificationToken: verificationToken,
          })
          .then(() => {
            const verificationURL = `http://localhost:8000/api/auth/verify?token=${verificationToken}&email=${req.body.email}`;

            const mailOptions = {
              from: "rakhshantest@gmail.com",
              to: req.body.email,
              subject: "SRZ Music Verification",
              text: `Please click this link to verify your email: ${verificationURL}`,
            };

            transport.sendMail(mailOptions, (err) => {
              if (err) {
                res.status(500).send("Error sending verification email.");
              } else {
                res
                  .status(200)
                  .send("Please check your email to verify your account.");
              }
            });
          });
      } else {
        res.send("Please enter a valid email");
      }
    }
  } catch {
    res.status(500).send("Error saving user to database.");
  }
});

router.get("/auth/verify", async (req, res) => {
  if (req.query.token) {
    await storage
      .getItem(req.query.email)
      .then((user) => {
        if (user.verificationToken === req.query.token) {
          user.verified = true;
          storage
            .setItem(req.query.email, user)
            .then(() => {
              res.redirect("/api/auth/email-confirmation");
            })
            .catch((err) => {
              res.status(500).send("Error updating user in database.");
            });
        } else {
          res.status(400).send("Invalid verification token.");
        }
      })
      .catch((err) => {
        res.status(500).send("Error looking up user in database.");
      });
  } else {
    res.status(400).send("Missing verification token.");
  }
});

// Set up the email confirmation route
router.get("/auth/email-confirmation", (req, res) => {
  // Render the email confirmation page
  res.send("Your email has been verified!");
});

// Verification
// POST request to login
router.post("/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Incorrect email or password.");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        if (req.user.verified == true) {
          res.send("Successfully Authenticated");
          console.log(req.user);
        } else if (req.user.verified == false) {
          req.logout(function (err) {
            if (err) {
              return next(err);
            }
            res.send("Please verify your email.");
            console.log(req.user);
          });
        }
      });
    }
  })(req, res, next);
});

// Some sort of request for JWT
// POST request to change password
router.post("/auth/change-password", async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  await storage.getItem(req.body.email).then((user) => {
    bcrypt.compare(currentPassword, user.password).then((match) => {
      if (match) {
        bcrypt.hash(newPassword, 10).then((hashedPassword) => {
          user.password = hashedPassword;
          storage.setItem(req.body.email, user).then(() => {
            res.json({
              success: true,
              message: "Password changed successfully",
            });
          });
        });
      } else {
        // Return an error message if the current password is incorrect
        res.json({
          success: false,
          message: "Incorrect password",
        });
      }
    });
  });
});

// POST request to logout
router.post("/auth/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Successfully logged out");
    console.log(req.user);
  });
});

// ----- Unauthorized Users ----- api/open

// GET to get policies
router.get("/open/policies", async (req, res) => {
  let existingPolicies = await storage.getItem("policies");
  if (!existingPolicies) {
    res.send("ERROR: policies not yet created");
  } else if (existingPolicies) {
    res.send(await storage.valuesWithKeyMatch("policies"));
  }
});

// GET Request for track search results
// soft-matched
router.get("/open/tracks", (req, res) => {
  const { trackTitle, artist, genreName } = req.query;

  let results = [...parseResults.tracks];
  let n = 15;

  if (trackTitle) {
    results = results.filter(
      (track) =>
        track.track_title.toLowerCase().includes(trackTitle.toLowerCase()) ||
        stringSimilarity.compareTwoStrings(
          track.track_title.toLowerCase(),
          trackTitle.toLowerCase()
        ) > 0.8
    );
  }

  if (artist) {
    results = results.filter(
      (track) =>
        track.artist_name.toLowerCase().includes(artist.toLowerCase()) ||
        stringSimilarity.compareTwoStrings(
          track.artist_name.toLowerCase(),
          artist.toLowerCase()
        ) > 0.8
    );
  }

  // need to fix this still
  if (genreName) {
    results = results.filter((track) => {
      if (
        String(track.track_genres)
          .toLowerCase()
          .includes(genreName.toLowerCase()) == true
      ) {
        return true;
      }
    });
  }

  results = results.slice(0, n);

  res.send(
    results.map((data) => {
      return {
        track_id: data.track_id,
      };
    })
  );
});

// GET Request for specific track
// Includes YouTube button stuff
router.get("/open/tracks/:id", (req, res) => {
  if (!isNaN(req.params.id)) {
    res.send(
      parseResults.tracks
        .filter((track) => track.track_id == req.params.id)
        .map((data) => {
          return {
            album_id: data.album_id,
            album_title: data.album_title,
            artist_id: data.artist_id,
            artist_name: data.artist_name,
            tags: data.tags,
            track_date_created: data.track_date_created,
            track_date_recorded: data.track_date_recorded,
            track_duration: data.track_duration,
            track_genres: data.track_genres,
            track_number: data.track_number,
            track_title: data.track_title,
            youtube_query: `https://www.youtube.com/results?search_query=${data.artist_name}%20${data.track_title}`,
          };
        })
    );
  }
});

// GET Request for 10 random public playlists
router.get("/open/lists", async (req, res) => {
  let results = [];

  try {
    await storage.forEach(async function (datum) {
      if (datum.value.type === "list" && datum.value.privateFlag === "public") {
        let totalPlaytime = 0;

        tracks = datum.value.tracks;
        for (trackid of tracks) {
          let duration = parseResults.tracks.filter(
            (trck) => trck.track_id == trackid
          )[0];
          if (duration) {
            duration = duration.track_duration;
            let timeSplit = duration.split(":");
            totalPlaytime +=
              parseInt(timeSplit[0]) * 60 + parseInt(timeSplit[1]);
          }
        }

        convertedPlaytime =
          Math.floor((totalPlaytime % 3600) / 60) +
          ":" +
          Math.floor((totalPlaytime % 3600) % 60);

        console.log("got to here!");

        let totalRating = 0;
        let numOfRatings = 0;
        await storage.forEach(async function (datum2) {
          if (
            datum2.value.type === "review" &&
            datum2.value.list === datum.key
          ) {
            totalRating += datum2.value.rating;
            numOfRatings++;
          }
        });

        let avgRating = totalRating / numOfRatings;

        results.push({
          listName: datum.key,
          creator: datum.value.creator,
          tracks: datum.value.tracks,
          playtime: convertedPlaytime,
          average_rating: avgRating,
        });

        console.log(results);
      } else {
        console.log("Error in getting lists");
      }
    });
  } catch (err) {
    console.log(err);
  }

  // sending back only the first 10 results
  res.send(results.slice(0, 10));
});

// GET Request for specific list
router.get("/open/lists/:name", async (req, res) => {
  let existingList = await storage.getItem(req.params.name);
  if (!existingList) {
    res.send("ERROR: no existing list with this name");
  } else if (existingList) {
    res.send(await storage.valuesWithKeyMatch(req.params.name));
  }
});

// ----- Authenticated Users ----- api/secure

// POST Request to create playlist
router.post(
  "/secure/lists",
  body("listName").not().isEmpty().trim().escape(),
  async (req, res) => {
    if (req.isAuthenticated()) {
      let existingList = await storage.getItem(req.body.listName);
      if (existingList) {
        res.send("ERROR: existing list with this name");
      } else if (!existingList) {
        storage.setItem(req.body.listName, {
          creator: req.body.username,
          tracks: req.body.tracks,
          privateFlag: req.body.privateFlag,
          type: "list",
        });
        res.send("Successfully added list!");
      }
    } else {
      res.send("User is not logged in!");
    }
  }
);

// PUT Request to edit playlist
router.put(
  "/secure/lists/:name",
  body("listName").not().isEmpty(),
  body("tracks").not().isEmpty(),
  async (req, res) => {
    if (req.isAuthenticated()) {
      let existingList = await storage.getItem(req.params.name);
      if (!existingList) {
        res.send("ERROR: no existing list with this name");
      } else if (
        (existingList && existingList.creator == req.user.username) ||
        req.user.admin == true
      ) {
        storage.setItem(req.params.name, {
          creator: req.body.username,
          tracks: req.body.tracks,
          privateFlag: req.body.privateFlag,
          type: "list",
        });
        res.send("Successfully updated tracks in list!");
      }
    } else {
      res.send("User is not logged in!");
    }
  }
);

// DELETE Request to delete playlist
router.delete("/secure/lists/:name", async (req, res) => {
  if (req.isAuthenticated()) {
    let existingList = await storage.getItem(req.params.name);
    if (!existingList) {
      res.send("ERROR: no existing list with this name");
    } else if (
      (existingList && existingList.creator == req.user.username) ||
      req.user.admin == true
    ) {
      storage.removeItem(req.params.name);
      res.send("Successfully deleted the list!");
    }
  } else {
    res.send("User is not logged in!");
  }
});

// POST Request to create review
router.post(
  "/secure/reviews",
  body("reviewName").not().isEmpty().trim().escape(),
  async (req, res) => {
    if (req.isAuthenticated()) {
      let existingReview = await storage.getItem(req.body.reviewName);
      if (existingReview) {
        res.send("ERROR: existing review with this name");
      } else if (!existingReview) {
        storage.setItem(req.body.reviewName, {
          creator: req.body.username,
          list: req.body.listName,
          rating: req.body.rating,
          comment: req.body.comment,
          hidden: false,
          type: "review",
        });
        res.send("Successfully added review!");
      }
    } else {
      res.send("User is not logged in!");
    }
  }
);

// PUT Request to edit a review
router.put(
  "/secure/reviews/:name",
  body("reviewName").not().isEmpty(),
  async (req, res) => {
    if (req.isAuthenticated()) {
      let existingReview = await storage.getItem(req.params.name);
      if (!existingReview) {
        res.send("ERROR: no existing review with this name");
      } else if (
        (existingReview && existingReview.creator == req.user.username) ||
        req.user.admin == true
      ) {
        storage.setItem(req.params.name, {
          creator: req.body.username,
          list: req.body.listName,
          rating: req.body.rating,
          comment: req.body.comment,
          hidden: false,
          type: "review",
        });
        res.send("Successfully added review!");
      }
    } else {
      res.send("User is not logged in!");
    }
  }
);

// DELETE Request to delete a review
router.delete("/secure/reviews/:name", async (req, res) => {
  if (req.isAuthenticated()) {
    let existingReview = await storage.getItem(req.params.name);
    if (!existingReview) {
      res.send("ERROR: no existing review with this name");
    } else if (
      (existingReview && existingReview.creator == req.user.username) ||
      req.user.admin == true
    ) {
      storage.removeItem(req.params.name);
      res.send("Successfully deleted the review!");
    }
  } else {
    res.send("User is not logged in!");
  }
});

// ----- Admin ----- api/admin

// PUT to modify site manager priveleges
// PUT to modify deactivated status
router.put("/admin/accounts/:email", async (req, res) => {
  if (req.isAuthenticated() && req.user.admin == true) {
    let user = await storage.getItem(req.params.email);
    if (!user) {
      res.send("ERROR: An account with this email does not exist");
    } else {
      storage.setItem(req.params.email, {
        username: user.username,
        password: user.password,
        deactivated: req.params.deactivated,
        admin: req.params.admin,
        verified: user.verified,
        verificationToken: user.verificationToken,
      });
    }
  }
});

// PUT to modify review hidden status
router.put(
  "/admin/reviews/:name",
  body("reviewName").not().isEmpty(),
  async (req, res) => {
    if (req.isAuthenticated() && req.user.admin == true) {
      let existingReview = await storage.getItem(req.params.name);
      if (!existingReview) {
        res.send("ERROR: no existing review with this name");
      } else if (existingReview) {
        storage.setItem(req.params.name, {
          creator: req.body.username,
          list: req.body.listName,
          rating: req.body.rating,
          comment: req.body.comment,
          hidden: true,
          type: "review",
        });
        res.send("Successfully hid review!");
      }
    } else {
      res.send("No permissions.");
    }
  }
);

// PUT to create/modify policies
router.put("/admin/policies", async (req, res) => {
  if (req.isAuthenticated() && req.user.admin == true) {
    storage.setItem("policies", {
      privacy: req.body.privacy,
      dmca: req.body.dmca,
      aup: req.body.aup,
    });
  } else {
    res.send("No permissions.");
  }
});
module.exports = router;
