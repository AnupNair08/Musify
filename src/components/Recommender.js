import React, { Component } from "react";
import { connect } from "react-redux";
class Recommender extends Component {
  constructor(props) {
    super();
    this.state = {
      history: [],
    };
  }
  componentDidUpdate = () => {
    console.log(this.props);
    // this.setState({
    //   history: this.state.history.concat(this.props.query),
    // });
  };
  render() {
    return (
      <div>
        <h1>Hello</h1>
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
