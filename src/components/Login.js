import React, { Component } from "react";
import SpotifyLogin from "react-spotify-login";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      login: false,
    };
  }

  //   handleLogin = () => {
  //     axios({
  //       method: "get",
  //       url: "http://localhost:5000/",
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         this.setState({
  //           logincomp: res.data + "&output=embed",
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  componentDidMount = () => {
    // console.log(this.props);
  };
  success = (res) => {
    console.log("Succesful");
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
      <div>
        <h1>Hello from Login</h1>
        {/* <a
          href={`https://accounts.spotify.com/authorize?client_id=7aa34fa0b4f94421ab2a34bf21a34e9b&response_type=code&redirect_uri=${redirect}&scope=user-read-private%20user-read-email&state=34fFs29kd09`}
        >
          Login with spotify
        </a> */}
        <SpotifyLogin
          clientId="7aa34fa0b4f94421ab2a34bf21a34e9b"
          redirectUri="http://localhost:3000/login"
          onSuccess={this.success}
          onFailure={this.failure}
          scope={("user-read-private", "streaming")}
          show_dialog={true}
        />
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
