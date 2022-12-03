// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static("public"));
app.use("/api", routes);

// Define port and start server
const port = 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
