import React, { Component } from "react";

class Pricing extends Component {
  render() {
    return (
      <div
        className="page-section bg-image"
        Style="background-image: url(../assets/img/pattern_2.svg)"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0 wow fadeInUp">
              <h1 className="mb-4">Pricing Plan</h1>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                inventore maxime ipsa eligendi quibusdam velit maiores adipisci
                odit, exercitationem cumque iusto at debitis reiciendis a, ipsum
                aliquam reprehenderit. Sed, delectus.
              </p>
              <a
                href="#"
                className="btn btn-gradient btn-split-icon rounded-pill"
              >
                <span className="icon mai-call-outline"></span> Custom Plan
              </a>
            </div>
            <div className="col-lg-7">
              <div className="pricing-table">
                <div className="pricing-item active wow zoomIn">
                  <div className="pricing-header">
                    <h5>Business Plan</h5>
                    <h1 className="fw-normal">$49.00</h1>
                  </div>
                  <div className="pricing-body">
                    <ul className="theme-list">
                      <li className="list-item">Push Notification</li>
                      <li className="list-item">Unlimited Bandwith</li>
                      <li className="list-item">Realtime Database</li>
                      <li className="list-item">Monthly Backup</li>
                      <li className="list-item">24/7 Support</li>
                    </ul>
                  </div>
                  <button className="btn btn-dark">Choose Plan</button>
                </div>
                <div className="pricing-item wow zoomIn" data-wow-delay="200ms">
                  <div className="pricing-header">
                    <h5>Starter Plan</h5>
                    <h1 className="fw-normal">$24.00</h1>
                  </div>
                  <div className="pricing-body">
                    <ul className="theme-list">
                      <li className="list-item">Push Notification</li>
                      <li className="list-item">Unlimited Bandwith</li>
                      <li className="list-item">Realtime Database</li>
                      <li className="list-item">Monthly Backup</li>
                      <li className="list-item">24/7 Support</li>
                    </ul>
                  </div>
                  <button className="btn btn-dark">Choose Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pricing;
