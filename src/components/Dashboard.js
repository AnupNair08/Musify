import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.accessToken,
      user: "",
    };
  }

  componentDidMount = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          user: res.data.display_name,
          profile: res.data.images[0].url,
        });
        console.log(this.state.profile);
      })
      .catch((err) => console.log(err));
  };

  handleLogout = () => {
    sessionStorage.setItem("login", "false");
    sessionStorage.setItem("accessToken", "");
    this.props.setAcessToken("");
    this.props.setlogin(false);
    this.setState({
      user: "",
    });
  };

  render() {
    const status = sessionStorage.getItem("login");
    if (status === "false") {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div>
        <h1>Welcome {this.state.user}</h1>
        <img src={this.state.profile}></img>
        <button onClick={this.handleLogout}>Logout</button>
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
export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);
