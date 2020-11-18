import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import Topmenu from "./components/Topmenu";
import Food from "./components/Food";
import About from "./components/About";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <>
        <Sidebar />
        <Topmenu />
        <div
          className="w3-main w3-content w3-padding"
          style={{ maxWidth: "1200px", marginTop: "100px" }}
        >
          <Food />
          <hr />
          <About />
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
