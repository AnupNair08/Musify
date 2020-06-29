import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Image } from "react-bootstrap";
import "./Artists.css";

class Recommender extends Component {
  constructor(props) {
    super();
    this.state = {
      history: [],
      result: <h1></h1>,
    };
  }
  componentDidUpdate = () => {
    console.log(this.props);
  };

  componentDidMount = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:5000/featured/?accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        const result = res.data.playlists.items.map((val, key) => {
          const ele = (
            <div
              key={key}
              className="d-flex row align-content-center justify-content-center"
            >
              <Image
                src={val.images[0].url}
                height="300px"
                width="300px"
              ></Image>
              <h4>{val.name}</h4>
            </div>
          );
          return ele;
        });
        ReactDOM.render(result, document.getElementById("featured"));
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <h1>Featured playlists for you</h1>
        <div className="hscroll" id="featured"></div>
      </div>
    );
  }
}
function mapStatetoProps(state) {
  return {
    history: state.history,
  };
}

export default connect(mapStatetoProps)(Recommender);
