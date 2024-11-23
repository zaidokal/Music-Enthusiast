const express = require("express");
const cors = require("cors");

const app = express();

// Allow CORS for specific origin
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with production URL when deployed
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allows cookies or session data
  })
);

// Other middleware and routes
app.use(express.json());
app.use("/api/auth", require("./routes"));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
