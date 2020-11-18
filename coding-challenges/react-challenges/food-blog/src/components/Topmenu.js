import React, { Component } from "react";

class Topmenu extends Component {
  render() {
    return (
      <div className="w3-top">
        <div
          className="w3-white w3-xlarge"
          style={{ maxWidth: "1200px", margin: "auto" }}
        >
          <div className="w3-button w3-padding-16 w3-left" onClick="w3_open()">
            &#9776;
          </div>
          <div className="w3-right w3-padding-16">Mail</div>
          <div className="w3-center w3-padding-16">My Food</div>
        </div>
      </div>
    );
  }
}

export default Topmenu;
