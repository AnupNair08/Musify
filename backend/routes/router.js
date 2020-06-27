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

router.get("/tracks", async (req, res) => {
  const accessToken = req.query.accessToken;
  const artistId = req.query.artistId;
  console.log(artistId);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IN`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

router.get("/search", async (req, res) => {
  const q = req.query.q;
  const accessToken = req.query.accessToken;
  const type = req.query.type;

  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/search?q=${q}&type=${type}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

module.exports = router;
