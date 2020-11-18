import React, { Component } from "react";

class Stories extends Component {
  render() {
    return (
      <div
        className="page-section bg-image bg-image-overlay-dark"
        Style="background-image: url(../assets/img/bg_testimonials.jpg)"
      >
        <div className="container fg-white">
          <div className="row">
            <div className="col-md-8 col-lg-6 offset-lg-1 wow fadeInUp">
              <h2 className="mb-5 fg-white fw-normal">Customer Stories</h2>
              <p className="fs-large font-italic">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Mollitia voluptates facere explicabo! Rerum necessitatibus cum
                qui veritatis reprehenderit, neque sapiente consequatur atque
                eaque molestias, est, quod totam quo laudantium ratione.
              </p>
              <p className="fs-large fg-grey fw-medium mb-5">
                John Doe, UI Designer
              </p>

              <a href="#" className="btn btn-outline-light rounded-pill">
                Read Stories <span className="mai-chevron-forward"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stories;
