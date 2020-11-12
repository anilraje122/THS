import React, { Component } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Clients from "./components/Clients";
import Features from "./components/Features";
import WhyUs from "./components/WhyUs";
import Pricing from "./components/Pricing";
import Stories from "./components/Stories";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <Header />
        <Clients />
        <Features />
        <WhyUs />
        <Pricing />
        <Stories />
        <ContactUs />
        <Footer />
      </>
    );
  }
}

export default App;
