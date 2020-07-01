const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
}

app.get("/", function (req, res) {
  res.sendFile("/index.html", { root: __dirname });
});

const router = require("./routes/router");
app.use("/api", router);
