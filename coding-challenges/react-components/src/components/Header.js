import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div
        className="page-hero-section bg-image hero-home-1"
        Style="background-image: url(../assets/img/bg_hero_1.svg)"
      >
        <div className="hero-caption pt-5">
          <div className="container h-100">
            <div className="row align-items-center h-100">
              <div className="col-lg-6 wow fadeInUp">
                <div className="badge mb-2">
                  <span className="icon mr-1">
                    <span className="mai-globe"></span>
                  </span>
                  #2 Editor Choice App of 2020
                </div>
                <h1 className="mb-4">Manage your Finance easier</h1>
                <p className="mb-4">
                  Mobster has features to view and manage <br />
                  our finances, such as transfer, and statistics.
                </p>
                <a href="#" className="btn btn-primary rounded-pill">
                  Get App Now
                </a>
              </div>
              <div className="col-lg-6 d-none d-lg-block wow zoomIn">
                <div className="img-place mobile-preview shadow floating-animate">
                  <img src="../assets/img/app_preview_1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
