const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
}

app.get("/", function (req, res) {
  res.sendFile("../build/index.html");
});

const merouter = require("./routes/me");
const dashrouter = require("./routes/dashboard");
const searchrouter = require("./routes/search");

app.use("/api/me", merouter);
app.use("/api/search", searchrouter);
app.use("/api/dashboard", dashrouter);

// const router = require("./routes/router");
// app.use("/api", router);
