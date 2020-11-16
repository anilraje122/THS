import React, { Component } from "react";

class Features extends Component {
  render() {
    return (
      <div
        className="position-realive bg-image"
        Style="background-image: url(../assets/img/pattern_1.svg)"
      >
        <div className="page-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 py-3">
                <div className="img-place mobile-preview shadow wow zoomIn">
                  <img src="../assets/img/app_preview_2.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 py-3 mt-lg-5">
                <div className="iconic-list">
                  <div className="iconic-item wow fadeInUp">
                    <div className="iconic-md iconic-text bg-warning fg-white rounded-circle">
                      <span className="mai-cube"></span>
                    </div>
                    <div className="iconic-content">
                      <h5>Powerful Features</h5>
                      <p className="fs-small">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore
                      </p>
                    </div>
                  </div>
                  <div className="iconic-item wow fadeInUp">
                    <div className="iconic-md iconic-text bg-info fg-white rounded-circle">
                      <span className="mai-shield"></span>
                    </div>
                    <div className="iconic-content">
                      <h5>Fully Secured</h5>
                      <p className="fs-small">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore
                      </p>
                    </div>
                  </div>
                  <div className="iconic-item wow fadeInUp">
                    <div className="iconic-md iconic-text bg-indigo fg-white rounded-circle">
                      <span className="mai-desktop-outline"></span>
                    </div>
                    <div className="iconic-content">
                      <h5>Easy Monitoring</h5>
                      <p className="fs-small">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-1 py-3 mt-lg-5 wow fadeInUp">
                <h1 className="mb-4">Ecommerce business opperate easilly</h1>
                <p className="mb-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quos, molestiae, perspiciatis laboriosam quia placeat
                  recusandae repudiandae corrupti similique delectus, aliquam
                  commodi possimus eveniet optio magnam quis vel. Reiciendis,
                  fuga excepturi.
                </p>
                <a href="#" className="btn btn-outline-primary rounded-pill">
                  How it works
                </a>
              </div>
              <div className="col-lg-5 py-3">
                <div className="img-place mobile-preview shadow wow zoomIn">
                  <img src="../assets/img/app_preview_3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Features;
