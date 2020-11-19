import React, { Component, Fragment } from "react";
// import "./App.css";
import "./TestStyle.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <div
          id="sample1"
          style={{
            backgroundColor: "red",
            height: "100px",
            width: "100px",
            marginBottom: 10,
          }}
        ></div>

        <div
          id="sample2"
          style={{
            backgroundColor: "blue",
            height: 100,
            width: 100,
            marginBottom: 10,
          }}
        ></div>

        <div id="sample3" style={style3}></div>

        <div id="sample4" style={style4}></div>

        <div id="sample5"></div>
        <div id="sample6"></div>

        <h1>Hello {Math.sqrt(25)}</h1>
        <h2>There</h2>
      </Fragment>
    );
  }
}

const style3 = {
  backgroundColor: "green",
  height: 100,
  width: 100,
  marginBottom: 10,
};

const style4 = {
  backgroundColor: "yellow",
  height: 100,
  width: 100,
  marginBottom: 10,
};

export default App;

/* 

Inline styling: Follow camel case for css properties : First two styles
Internal styling: JS object style : style2 and style3
External styling: Use import and add external css file : style5 style6

*/
