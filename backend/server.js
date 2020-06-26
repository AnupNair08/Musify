const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.listen(5000, () => {
  console.log("App listening on port 5000");
});

const router = require("./routes/router");
app.use("/", router);
