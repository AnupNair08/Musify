import React, { Component } from "react";
import { connect } from "react-redux";
class Player extends Component {
  componentDidMount = () => {
    console.log(this.props);
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
