import React, { Component } from "react";

class ContactUs extends Component {
  render() {
    return (
      <div className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 py-3 mb-5 mb-lg-0">
              <div className="img-place w-lg-75 wow zoomIn">
                <img src="../assets/img/illustration_contact.svg" alt="" />
              </div>
            </div>
            <div className="col-lg-5 py-3">
              <h1 className="wow fadeInUp">
                Need a help? <br />
                Don't worry just contact us
              </h1>

              <form method="POST" className="mt-5">
                <div className="form-group wow fadeInUp">
                  <label for="name" className="fw-medium fg-grey">
                    Fullname
                  </label>
                  <input type="text" className="form-control" id="name" />
                </div>

                <div className="form-group wow fadeInUp">
                  <label for="email" className="fw-medium fg-grey">
                    Email
                  </label>
                  <input type="text" className="form-control" id="email" />
                </div>

                <div className="form-group wow fadeInUp">
                  <label for="message" className="fw-medium fg-grey">
                    Message
                  </label>
                  <textarea
                    rows="6"
                    className="form-control"
                    id="message"
                  ></textarea>
                </div>

                <div className="form-group mt-4 wow fadeInUp">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
