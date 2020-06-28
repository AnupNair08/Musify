import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import "./Browse.css";
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

  handleSearch = (e) => {
    axios({
      method: "get",
      url: `http://localhost:5000/search/?q=${
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
    this.setState({
      browse: false,
    });
  };

  getItem = (id, art) => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:5000/albumtrack/?id=${id}&accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data.items.map((val, key) => {
          const ele = (
            <div key={key} className="d-flex col">
              <Image src={art} height="300px" width="300px"></Image>
              <audio controls src={val.preview_url}></audio>
              <h5>{val.name}</h5>
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
      url: `http://localhost:5000/tracks/?accessToken=${accessToken}&artistId=${id}`,
    })
      .then((res) => {
        console.log(res);
        let flag = 1;
        const data = res.data.tracks.map((val, key) => {
          const ele = (
            <div key={key}>
              {flag ? (
                <Image
                  src={
                    art
                      ? art.url
                      : "https://cdn4.iconfinder.com/data/icons/users-26/100/user-01-512.png"
                  }
                  height="300px"
                  width="300px"
                ></Image>
              ) : (
                <p></p>
              )}
              <audio controls src={val.preview_url}></audio>
              <h5>{val.name}</h5>
            </div>
          );
          flag = 0;
          return ele;
        });
        console.log(data);
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
          >
            <Image
              src={val.images[0].url}
              height="80px"
              width="80px"
              className="rounded-circle"
            ></Image>
            <h5>{val.name}</h5>
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
              height="50px"
              width="50px"
              className="rounded-circle"
            ></Image>
            <h5>
              {val.name}
              <br></br>
              {val.followers.total}
            </h5>
          </div>
        );
        return ele;
      });
    }

    return (
      <div className="d-flex col content main">
        <div className="left">
          {!this.state.browse && <Redirect to="/dashboard"></Redirect>}
          <Navbar bg="dark">
            <Nav.Link className="text-light" onClick={this.handleRequest}>
              Back
            </Nav.Link>
          </Navbar>
          <h1>Hello Browser</h1>
          <div className="d-flex col">
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
                  <Dropdown.Item onClick={() => this.changeType("genre")}>
                    Genre
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleSearch}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div className="ml-5">{result}</div>
        </div>

        <div id="result"></div>
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
  };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Browse);
