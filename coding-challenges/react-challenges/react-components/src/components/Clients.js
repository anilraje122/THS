import React, { Component } from "react";

class Clients extends Component {
  render() {
    return (
      <div className="page-section mt-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3 py-3 wow zoomIn">
              <div className="img-place client-img">
                <img src="../assets/img/clients/alter_sport.png" alt="" />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 py-3 wow zoomIn">
              <div className="img-place client-img">
                <img src="../assets/img/clients/cleaning_service.png" alt="" />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 py-3 wow zoomIn">
              <div className="img-place client-img">
                <img src="../assets/img/clients/creative_photo.png" alt="" />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 py-3 wow zoomIn">
              <div className="img-place client-img">
                <img src="../assets/img/clients/global_tv.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Clients;
