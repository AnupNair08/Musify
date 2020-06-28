import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Image, Modal, Button } from "react-bootstrap";
import "./Dashboard.css";
import "./Artists.css";

class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: false,
      cur: {},
      tracks: [],
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

  gettracks = (id) => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:5000/tracks/?accessToken=${accessToken}&artistId=${id}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          tracks: res.data.tracks,
        });
      })
      .catch((err) => console.log(err));
  };

  toggle = (artist) => {
    if (this.state.show === false) {
      this.setState({
        show: true,
        cur: artist,
      });
      console.log(artist);
    } else {
      this.setState({
        show: false,
      });
    }
  };

  play = (url) => {
    if (!url) return;
    const ele = (
      <div>
        <audio controls src={url}></audio>
      </div>
    );
    this.toggle();
    ReactDOM.render(ele, document.getElementById("player"));
  };

  render() {
    const artists = this.state.data.map((val, key) => {
      const ele = (
        <div key={key} className="d-flex row align-content-center">
          <Image
            src={val.images[0].url}
            className="artist"
            alt={val.name}
            onClick={() => {
              this.gettracks(val.id);
              this.toggle(val);
            }}
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
        <div>
          <Modal show={this.state.show} onHide={this.toggle}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.cur.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.show && (
                <div>
                  <Image
                    src={this.state.cur.images[0].url}
                    height="300px"
                    width="300px"
                    className="rounded mx-auto d-block mb-5 justify-content-center align-items-center"
                  ></Image>
                  {this.state.tracks.map((val, key) => {
                    return (
                      <div
                        key={key}
                        className="d-flex col mb-3"
                        onClick={() => this.play(val.preview_url)}
                      >
                        <img
                          src={val.album.images[0].url}
                          height="60px"
                          width="60px"
                          className="rounded-circle"
                          alt={val.name}
                        ></img>
                        <h5>{val.name}</h5>
                      </div>
                    );
                  })}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.toggle}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div id="player"></div>
        </div>
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
