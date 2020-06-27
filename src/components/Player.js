import React, { Component } from "react";
import { connect } from "react-redux";
class Player extends Component {
  render() {
    return (
      <div>
        <h1>Player</h1>
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
