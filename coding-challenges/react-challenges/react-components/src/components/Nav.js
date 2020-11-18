import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-floating">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="../assets/favicon.png" alt="" width="40" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav ml-lg-5 mt-3 mt-lg-0">
              <li className="nav-item dropdown active">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Home
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item active" href="index.html">
                    Homepage 1
                  </a>
                  <a className="dropdown-item" href="index-2.html">
                    Homepage 2
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="updates.html">
                  What's New
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  Contact
                </a>
              </li>
            </ul>
            <div className="ml-auto my-2 my-lg-0">
              <button className="btn btn-dark rounded-pill">
                Download Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
