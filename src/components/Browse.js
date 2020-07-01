import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import "./Browse.css";
import "./Artists.css";
import {
  InputGroup,
  FormControl,
  Button,
  Image,
  Dropdown,
  Navbar,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import Footer from "./Footer";
class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      type: "album",
      browse: true,
      tracks: {},
    };
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSearch = () => {
    if (!this.state.query) {
      store.addNotification({
        title: "No Query",
        message: "Please enter a search query",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true,
        },
      });
      return;
    }
    axios({
      method: "get",
      url: `http://localhost:5000/api/search/?q=${
        this.state.query
      }&accessToken=${sessionStorage.getItem("accessToken")}&type=${
        this.state.type
      }`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          results: res.data,
        });
        const query = {
          q: this.state.query,
          type: this.state.type,
        };
        this.props.setquery(query);
      })
      .catch((err) => console.log(err));
  };

  changeType = (type) => {
    this.setState({
      type: type,
      results: {},
    });
  };
  handleRequest = () => {
    this.props.setsong("");
    this.setState({
      browse: false,
    });
  };

  play = (url) => {
    if (!url) {
      store.addNotification({
        title: "No Preview",
        message: "Preview link not found",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true,
        },
      });
      return;
    }
    this.setState({
      curtrack: url,
    });
  };

  getItem = (id, art) => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:5000/api/albumtrack/?id=${id}&accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data.items.map((val, key) => {
          const ele = (
            <div
              key={key}
              className="d-flex row align-items-center justify-content-center mr-5"
            >
              <Image src={art} height="300px" width="300px"></Image>
              <h5 className="w-100">{val.name}</h5>
              <Button onClick={() => this.play(val.preview_url)}>Play</Button>
            </div>
          );
          return ele;
        });
        console.log(data);
        ReactDOM.render(data, document.getElementById("result"));
      })
      .catch((err) => console.log(err));
  };

  getartist = (id, art) => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:5000/api/tracks/?accessToken=${accessToken}&artistId=${id}`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data.tracks.map((val, key) => {
          const ele = (
            <div key={key}>
              <Image
                src={
                  art
                    ? art.url
                    : "https://cdn4.iconfinder.com/data/icons/users-26/100/user-01-512.png"
                }
                height="300px"
                width="300px"
              ></Image>
              <h6 className="w-100">{val.name}</h6>
              <Button onClick={() => this.play(val.preview_url)}>Play</Button>
            </div>
          );
          return ele;
        });
        ReactDOM.render(data, document.getElementById("result"));
      })
      .catch((err) => console.log(err));
  };

  render() {
    let result = <div></div>;
    if (
      this.state.type === "album" &&
      Object.keys(this.state.results).length !== 0
    ) {
      result = this.state.results.albums.items.map((val, key) => {
        const ele = (
          <div
            onClick={() => this.getItem(val.id, val.images[0].url)}
            key={key}
            className="d-flex row align-content-center mb-2"
            role="button"
          >
            <Image
              src={val.images[0].url}
              height="80px"
              width="80px"
              className="rounded-circle"
            ></Image>
            <h6 className="d-flex col  align-items-center w-100">{val.name}</h6>
          </div>
        );
        return ele;
      });
    }

    if (
      this.state.type === "artist" &&
      Object.keys(this.state.results).length !== 0
    ) {
      result = this.state.results.artists.items.map((val, key) => {
        const ele = (
          <div
            key={key}
            className="d-flex row align-content-center mb-2"
            onClick={() => this.getartist(val.id, val.images[0])}
          >
            <Image
              src={
                val.images[0]
                  ? val.images[0].url
                  : "https://cdn4.iconfinder.com/data/icons/users-26/100/user-01-512.png"
              }
              height="100px"
              width="100px"
              className="rounded-circle"
            ></Image>
            <h5 className="d-flex col  align-items-center w-100">{val.name}</h5>
          </div>
        );
        return ele;
      });
    }

    return (
      <div className="d-flex row text-light thide">
        <ReactNotification />
        <div className="w-100">
          <Navbar bg="dark">
            <Nav.Link className="text-light" onClick={this.handleRequest}>
              Back
            </Nav.Link>
            <Nav.Item className="mx-auto w-80">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Whats on your mind?"
                  aria-label="Search an album"
                  aria-describedby="basic-addon2"
                  onChange={this.handleChange}
                />
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Look By
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.changeType("album")}>
                      Albums
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.changeType("artist")}>
                      Artist
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <InputGroup.Append>
                  <Button variant="outline-primary" onClick={this.handleSearch}>
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Nav.Item>
          </Navbar>
        </div>
        <div className="d-flex col content main w-100">
          <div className="left">
            {!this.state.browse && <Redirect to="/dashboard"></Redirect>}
            <div className="d-flex col"></div>
            <div className="ml-5">{result}</div>
          </div>

          <div id="result" className="hscroll"></div>
        </div>
        <Footer song={this.state.curtrack}></Footer>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    query: state.query,
  };
}
function mapDispatchtoProps(dispatch) {
  return {
    setquery: (data) => {
      dispatch({ type: "SET_QUERY", payload: data });
    },
    setsong: (data) => {
      dispatch({ type: "SET_SONG", payload: data });
    },
  };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Browse);
