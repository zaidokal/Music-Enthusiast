const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const parser = require("./parser");
const stringSimilarity = require("string-similarity");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

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

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'}, 
        async (email, password, done) => {
        let emails = await storage.keys();
        if (emails.includes(email)) {
            let user = await storage.getItem(email);

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                let userObj = {
                    theEmail: email,
                    username: user.username,
                    password: user.password
                }
                return done(null, userObj);
                } else {
                return done(null, false);
                }
            });
        } else {
        return done(null, false);
        }
    })
);

passport.serializeUser(function(userObj, cb) {
    process.nextTick(function() {
      return cb(null, {
        email: userObj.theEmail,
        username: userObj.username,
        password: userObj.password
      });
    });
});
  
  passport.deserializeUser(function(userObj, cb) {
    process.nextTick(function() {
      return cb(null, userObj);
    });
});

// passport.serializeUser((userObj, done) => {
// done(null, userObj.theEmail);
// });

// passport.deserializeUser(async (theEmail, done) => {
// let user = await storage.getItem(theEmail);
// done(err, user);
// });

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
// POST reqeust to create account
router.post("/auth/accounts", async (req, res) => {
  let existingEmail = await storage.getItem(req.body.email);

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (existingEmail) {
      res.send("ERROR: An account with this email already exists");
    } else {
      storage.setItem(req.body.email, {
        username: req.body.userName,
        password: hashedPassword,
      });

      res.send("Successfully created account.");
    }
  } catch {
    res.status(500).send();
  }
});

// Verification
// POST request to login
router.post('/auth/login', 
passport.authenticate('local', { failureRedirect: '/api/genres', failureMessage: true }), 
function(req, res) {
    res.send("bruh");
});

// Some sort of request for JWT
// PUT request to change password

// ----- Unauthorized Users ----- api/open
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
// include youtube button stuff
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
    let existingList = await storage.getItem(req.body.listName);
    if (existingList) {
      res.send("ERROR: existing list with this name");
    } else if (!existingList) {
      storage.setItem(req.body.listName, {
        creator: req.body.userName,
        tracks: req.body.tracks,
        privateFlag: "private",
        type: "list",
      });
      res.send("Successfully added list!");
    }
  }
);

// PUT Request to edit playlist
router.put(
  "/secure/lists/:name",
  body("listName").not().isEmpty(),
  body("tracks").not().isEmpty(),
  async (req, res) => {
    let existingList = await storage.getItem(req.params.name);
    if (!existingList) {
      res.send("ERROR: no existing list with this name");
    } else if (existingList) {
      storage.setItem(req.params.name, {
        creator: req.body.userName,
        tracks: req.body.tracks,
        privateFlag: req.body.privateFlag,
        type: "list",
      });
      res.send("Successfully updated tracks in list!");
    }
  }
);

// DELETE Request to delete playlist
router.delete("/secure/lists/:name", async (req, res) => {
  let existingList = await storage.getItem(req.params.name);
  if (!existingList) {
    res.send("ERROR: no existing list with this name");
  } else if (existingList) {
    storage.removeItem(req.params.name);
    res.send("Successfully deleted the list!");
  }
});

// POST Request to create review
router.post(
  "/secure/reviews",
  body("reviewName").not().isEmpty().trim().escape(),
  async (req, res) => {
    let existingReview = await storage.getItem(req.body.reviewName);
    if (existingReview) {
      res.send("ERROR: existing review with this name");
    } else if (!existingReview) {
      storage.setItem(req.body.reviewName, {
        list: req.body.listName,
        rating: req.body.rating,
        comment: req.body.comment,
        hidden: false,
        type: "review",
      });
      res.send("Successfully added review!");
    }
  }
);

// PUT Request to edit a review
router.put(
  "/secure/reviews/:name",
  body("reviewName").not().isEmpty(),
  async (req, res) => {
    let existingReview = await storage.getItem(req.params.name);
    if (!existingReview) {
      res.send("ERROR: no existing review with this name");
    } else if (existingReview) {
      storage.setItem(req.params.name, {
        list: req.body.listName,
        rating: req.body.rating,
        comment: req.body.comment,
        hidden: false,
        type: "review",
      });
      res.send("Successfully added review!");
    }
  }
);

// DELETE Request to delete a review
router.delete("/secure/reviews/:name", async (req, res) => {
  let existingReview = await storage.getItem(req.params.name);
  if (!existingReview) {
    res.send("ERROR: no existing review with this name");
  } else if (existingReview) {
    storage.removeItem(req.params.name);
    res.send("Successfully deleted the review!");
  }
});

// ----- Admin ----- api/admin
// PUT to modify site manager priveleges
// PUT to modify deactivated status
// PUT to modify review hidden status
router.put(
  "/admin/reviews/:name",
  body("reviewName").not().isEmpty(),
  async (req, res) => {
    let existingReview = await storage.getItem(req.params.name);
    if (!existingReview) {
      res.send("ERROR: no existing review with this name");
    } else if (existingReview) {
      storage.setItem(req.body.reviewName, {
        list: req.body.listName,
        rating: req.body.rating,
        comment: req.body.comment,
        hidden: true,
        type: "review",
      });
      res.send("Successfully hid review!");
    }
  }
);

// GET to get policies
router.get("/admin/policies", async (req, res) => {
  let existingPolicies = await storage.getItem("policies");
  if (!existingPolicies) {
    res.send("ERROR: policies not yet created");
  } else if (existingPolicies) {
    res.send(await storage.valuesWithKeyMatch("policies"));
  }
});

// PUT to create/modify policies
router.put("/admin/policies", async (req, res) => {
  storage.setItem("policies", {
    privacy: req.body.privacy,
    dmca: req.body.dmca,
    aup: req.body.aup,
  });
});
module.exports = router;
