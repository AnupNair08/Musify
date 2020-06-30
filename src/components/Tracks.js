import React, { Component } from "react";
import { Image } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { connect } from "react-redux";

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      song: "",
    };
  }

  componentDidMount = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:5000/toptracks/?accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.items,
        });
      })
      .catch((err) => console.log(err));
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
    this.props.setsong(url);
    this.setState({
      song: url,
    });
  };

  render() {
    const tracks = this.state.data.map((val, key) => {
      const ele = (
        <div
          key={key}
          className="d-flex row align-content-center justify-content-center mx-2"
          onClick={() => this.play(val.preview_url)}
        >
          <Image
            src={val.album.images[0].url}
            height="300px"
            width="300px"
          ></Image>
          <h6 className="mt-3">{val.name}</h6>
        </div>
      );
      return ele;
    });
    return (
      <div>
        <ReactNotification />
        <h1>Top Tracks for you</h1>
        <div className="hscroll">{tracks}</div>
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

export default connect(null, mapDispatchToProps)(Tracks);
