const express = require("express");
const router = express.Router();
const axios = require("axios");
const fetch = require("node-fetch");
router.get("/artists", async (req, res) => {
  const accessToken = req.query.accessToken;
  console.log(accessToken);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET",
    headers: headers,
  });
  console.log(result);
  const f = await result.json();
  res.json(f);
});

module.exports = router;
