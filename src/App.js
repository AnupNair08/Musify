import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/login" component={Login}></Route>

        {/* <Login></Login> */}
        {this.props.login && <Redirect to="/dashboard"></Redirect>}
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

export default connect(mapStatetoProps)(App);
