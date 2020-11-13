import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return (
      <h1>
        Hello World,
        <br />
        <br />
        First react app using method 3
      </h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
