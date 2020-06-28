import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Artists from "./Artists";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Recommender from "./Recommender";
import ReactAudioPlayer from "react-audio-player";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.accessToken,
      user: "",
      browse: false,
    };
  }

  componentDidMount = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: "https://api.spotify.com/v1/me/",
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

  browse = () => {
    this.setState({
      browse: true,
    });
  };

  render() {
    const status = sessionStorage.getItem("login");
    if (status === "false") {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div>
        {this.state.browse && (
          <Redirect to="/browse" from="/dashboard"></Redirect>
        )}
        <Navbar bg="dark" variant="dark" sticky>
          <Navbar.Brand>Musify</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={this.browse}>Browse</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            <NavDropdown
              drop={"left"}
              title="Me"
              id="dropdown-variants-secondary"
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Item onClick={this.handleLogout}>Logout</Nav.Item>
              </NavDropdown.Item>
            </NavDropdown>
            <img
              src={this.state.profile}
              alt="user"
              height="40px"
              width="40px"
              className="rounded-circle"
            ></img>
          </Nav>
        </Navbar>
        <h1>Welcome {this.state.user}</h1>
        <Artists></Artists>
        <Recommender></Recommender>
        <ReactAudioPlayer></ReactAudioPlayer>
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
