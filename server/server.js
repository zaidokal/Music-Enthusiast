if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", express.static("public"));
app.use("/api", routes);

// Define port and start server
const port = 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
