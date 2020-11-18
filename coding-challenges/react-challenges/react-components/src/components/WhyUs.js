import React, { Component } from "react";

class WhyUs extends Component {
  render() {
    return (
      <div className="page-section bg-dark fg-white">
        <div className="container">
          <h1 className="text-center">Why Choose Mobster</h1>

          <div className="row justify-content-center mt-5">
            <div className="col-md-6 col-lg-3 py-3">
              <div className="card card-body border-0 bg-transparent text-center wow zoomIn">
                <div className="mb-3">
                  <img src="../assets/img/icons/rocket.svg" alt="" />
                </div>
                <p className="fs-large">Very Fast</p>
                <p className="fs-small fg-grey">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-3">
              <div
                className="card card-body border-0 bg-transparent text-center wow zoomIn"
                data-wow-delay="200ms"
              >
                <div className="mb-3">
                  <img src="../assets/img/icons/testimony.svg" alt="" />
                </div>
                <p className="fs-large">Happy Client</p>
                <p className="fs-small fg-grey">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-3">
              <div
                className="card card-body border-0 bg-transparent text-center wow zoomIn"
                data-wow-delay="400ms"
              >
                <div className="mb-3">
                  <img src="../assets/img/icons/promotion.svg" alt="" />
                </div>
                <p className="fs-large">Free Ads</p>
                <p className="fs-small fg-grey">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-3">
              <div
                className="card card-body border-0 bg-transparent text-center wow zoomIn"
                data-wow-delay="600ms"
              >
                <div className="mb-3">
                  <img src="../assets/img/icons/coins.svg" alt="" />
                </div>
                <p className="fs-large">Save Money</p>
                <p className="fs-small fg-grey">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-3">
              <div
                className="card card-body border-0 bg-transparent text-center wow zoomIn"
                data-wow-delay="800ms"
              >
                <div className="mb-3">
                  <img src="../assets/img/icons/support.svg" alt="" />
                </div>
                <p className="fs-large">24/7 Support</p>
                <p className="fs-small fg-grey">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-3">
              <div
                className="card card-body border-0 bg-transparent text-center wow zoomIn"
                data-wow-delay="1000ms"
              >
                <div className="mb-3">
                  <img src="../assets/img/icons/laptop.svg" alt="" />
                </div>
                <p className="fs-large">Full Features</p>
                <p className="fs-small fg-grey">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhyUs;
