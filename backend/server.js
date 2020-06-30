const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const router = require("./routes/router");
app.use("/", router);
