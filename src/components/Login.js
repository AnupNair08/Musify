import React, { Component } from "react";
import SpotifyLogin from "react-spotify-login";
import { connect } from "react-redux";
import "./Login.css";
import { Image } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      login: false,
    };
  }

  success = (res) => {
    console.log("Succesfull login");
    this.setState({
      accessToken: res.access_token,
      login: true,
    });
    sessionStorage.setItem("login", "true");
    sessionStorage.setItem("accessToken", this.state.accessToken);

    this.props.setAcessToken(this.state.accessToken);
    this.props.setlogin(true);
  };

  failure = (err) => console.log(err);

  render() {
    return (
      <div
        className="d-flex row justify-content-center align-item-center text-light"
        id="login"
      >
        <div className="w-100">
          <h1>Musify</h1>
          <p className="text-muted">A mini spotify client</p>
          <Image src="https://cdn1.iconfinder.com/data/icons/multimedia-sound-3/32/Analyze-_sound-_wave-music-512.png"></Image>
        </div>
        <div>
          <SpotifyLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            redirectUri="http://localhost:3000/login"
            onSuccess={this.success}
            onFailure={this.failure}
            scope={("user-read-private", "streaming", "user-top-read")}
            className="btn btn-outline-success"
          />
        </div>
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

function mapDispatchtoProps(dispatch) {
  return {
    setuser: (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
    setAcessToken: (accessToken) => {
      dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
    },
    setlogin: (status) => {
      dispatch({ type: "LOGIN", payload: status });
    },
  };
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
