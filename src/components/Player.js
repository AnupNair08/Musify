import React, { Component } from "react";
import { connect } from "react-redux";
class Player extends Component {
  componentDidMount = () => {
    console.log(this.props);
    let player = {};
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = "Bearer " + sessionStorage.getItem("accessToken");
        console.log(token);
        player = new window.Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        // Error handling
        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener("player_state_changed", (state) => {
          console.log(state);
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.connect();
      };
    }

    this.setState({
      player: player,
    });
  };

  play = () => {
    const access_token = sessionStorage.getItem("accessToken");
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: { getOAuthToken, id },
      },
    }) => {
      getOAuthToken((access_token) => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: "PUT",
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
      });
    };

    play({
      playerInstance: new window.Spotify.Player({ name: "..." }),
      spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
    });
  };

  render() {
    return (
      <div>
        <h1>Player</h1>
        <audio controls="controls">
          <source
            src="https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86"
            type="audio/mpeg"
          />
        </audio>
        <button onClick={this.play}></button>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    accessToken: state.accessToken,
    login: state.login,
  };
}

export default connect(mapStatetoProps)(Player);
