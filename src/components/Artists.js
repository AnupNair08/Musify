import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Image } from "react-bootstrap";
import "./Dashboard.css";
import "./Artists.css";

class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:5000/artists/?accessToken=${accessToken}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.items,
        });
      })
      .catch((err) => console.log(err));
    // this.getArtisits();
  };

  render() {
    const artists = this.state.data.map((val, key) => {
      const ele = (
        <div key={key} className="d-flex row align-content-center">
          <Image
            src={val.images[0].url}
            className="artist"
            alt={val.name}
          ></Image>
          <h3>{val.name}</h3>
        </div>
      );
      return ele;
    });

    return (
      <div>
        <h1>Artists</h1>
        <div className="hscroll">{artists}</div>
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

export default connect(mapStatetoProps)(Artists);
