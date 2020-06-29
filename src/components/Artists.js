import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Image, Modal, Button } from "react-bootstrap";
import "./Dashboard.css";
import "./Artists.css";
import Footer from "./Footer";

class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: false,
      cur: {},
      tracks: [],
      song: "",
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
    this.setState({
      song: url,
    });
    this.toggle();
  };

  msToTime = (duration) => {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  render() {
    const artists = this.state.data.map((val, key) => {
      const ele = (
        <div
          key={key}
          className="d-flex row align-content-center justify-content-center"
        >
          <div className="rounded-circle gradient">
            <Image
              src={val.images[0].url}
              className="artist"
              alt={val.name}
              onClick={() => {
                this.gettracks(val.id);
                this.toggle(val);
              }}
            ></Image>
          </div>
          <h3>{val.name}</h3>
        </div>
      );
      return ele;
    });

    return (
      <div>
        <h1>Checkout your top artists</h1>
        <div className="hscroll">{artists}</div>
        <div>
          <Modal show={this.state.show} onHide={this.toggle}>
            <Modal.Header closeButton className="bg-dark text-light">
              <Modal.Title className="mx-auto display-4">
                {this.state.cur.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
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
                          height="100px"
                          width="100px"
                          className="mr-4"
                          alt={val.name}
                        ></img>
                        <div className="d-flex row">
                          <h5 className="lead font-weight-bold w-100 mb-1">
                            {val.name}
                          </h5>
                          <h4 className="lead mt-0">
                            {this.msToTime(val.duration_ms)}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="bg-dark text-light">
              <Button variant="secondary" onClick={this.toggle}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Footer song={this.state.song}></Footer>
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
