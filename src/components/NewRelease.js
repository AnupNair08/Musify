import React, { Component } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import "./Artists.css";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class NewRelease extends Component {
  constructor() {
    super();
    this.state = {
      data: <div></div>,
    };
  }

  getresult = (val) => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/albumtrack/?accessToken=${sessionStorage.getItem(
        "accessToken"
      )}&id=${val.id}`,
    })
      .then((res) => {
        console.log(res);
        const uri = res.data.items[0].preview_url;
        if (uri === null) {
          alert("No preview link");

          return;
        }
        this.props.setsong(uri);
      })
      .catch((err) => console.log(err));

    return;
  };
  componentDidMount = () => {
    const accessToken = sessionStorage.getItem("accessToken");

    axios({
      method: "get",
      url: `http://localhost:5000/api/newreleases/?accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data.albums.items.map((val, key) => {
          const ele =
            val.album_type === "single" ? (
              <div
                key={key}
                onClick={() => this.getresult(val)}
                className="click"
              >
                <Image
                  src={val.images[0].url}
                  height="300px"
                  width="300px"
                  alt={val.name}
                ></Image>
                <h4>{val.name}</h4>
              </div>
            ) : (
              <div key={key}></div>
            );
          return ele;
        });
        this.setState({
          data: data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="text-light">
        <h1>New Releases</h1>
        <div className="hscroll">{this.state.data}</div>
        <ReactNotification />
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
export default connect(null, mapDispatchToProps)(NewRelease);
