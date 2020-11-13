import React, { Fragment } from "react";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <h1>Hello World</h1>
        <h2>This is my seoncd React App</h2>
        <p>Importing external components</p>
        <ul>
          <li>
            <Navbar />
          </li>
          <li>
            <Landing />
          </li>
          <li>
            <Footer />
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default App;

// nav, carousel, heading, features, footer
