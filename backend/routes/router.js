const express = require("express");
const router = express.Router();
const axios = require("axios");
const fetch = require("node-fetch");
router.get("/", async (req, res) => {
  let result = await fetch(
    "https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09"
  );
  console.log(result.url);
  res.send(result.url);
});

module.exports = router;
