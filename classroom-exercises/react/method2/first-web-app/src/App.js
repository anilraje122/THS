import React, { Component } from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Marketing from "./components/Marketing";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <main role="main">
          <Carousel />
          <Marketing />
          <Footer />
        </main>
      </>
    );
  }
}

export default App;
