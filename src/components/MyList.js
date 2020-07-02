import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

class MyList extends Component {
  constructor() {
    super();
    this.state = {
      playlist: true,
      data: <div></div>,
    };
  }

  componentDidMount = () => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/myplaylists/?accessToken=${sessionStorage.getItem(
        "accessToken"
      )}`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data.items.map((val, key) => {
          axios({
            method: "get",
            url: `http://localhost:5000/api/albumtrack/?accessToken=${sessionStorage.getItem(
              "accessToken"
            )}&id=${val.id}`,
          })
            .then((res) => console.log(res))
            .catch((err) => err);
          const ele = (
            <div key={key}>
              <h1>{val.name}</h1>
              <Image
                src={val.images[0].url}
                height="300px"
                width="300px"
              ></Image>
            </div>
          );
          return ele;
        });

        this.setState({
          data: data,
        });
      })
      .catch((err) => console.log(err));
  };

  handleRequest = () => {
    this.props.setsong("");
    this.setState({
      playlist: false,
    });
  };
  render() {
    return (
      <div className="text-light">
        {!this.state.playlist && <Redirect to="/dashboard"></Redirect>}
        <Navbar bg="dark">
          <Nav.Link className="text-light" onClick={this.handleRequest}>
            Back
          </Nav.Link>
        </Navbar>
        <h1>My Playlists</h1>
        <div>{this.state.data}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setsong: (song) => {
      dispatch({ type: "SET_SONG", payload: song });
    },
  };
}

export default connect(null, mapDispatchToProps)(MyList);
