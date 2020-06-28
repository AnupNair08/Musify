import React, { Component } from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  FormControl,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Recommender from "./Recommender";

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      type: "",
      browse: true,
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
  render() {
    let result = <div></div>;
    if (
      this.state.type === "album" &&
      Object.keys(this.state.results).length !== 0
    ) {
      result = this.state.results.albums.items.map((val, key) => {
        const ele = (
          <div key={key} className="d-flex row align-content-center mb-2">
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
          <div key={key} className="d-flex row align-content-center mb-2">
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
              {val.followers.total}
            </h5>
            <h5></h5>
          </div>
        );
        return ele;
      });
    }

    return (
      <div className="d-flex col">
        {!this.state.browse && <Redirect to="/dashboard"></Redirect>}
        <button onClick={this.handleRequest}>Go back</button>
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
        <Recommender></Recommender>
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
