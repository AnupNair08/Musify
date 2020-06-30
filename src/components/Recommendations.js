import React, { Component } from "react";
import axios from "axios";

export default class Recommendations extends Component {
  componentDidMount = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:5000/recommendations/?accessToken=${accessToken}`,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}
