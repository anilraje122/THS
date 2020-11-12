import React, { Component } from "react";

class Clients extends Component {
  render() {
    return (
      <div class="page-section mt-5">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-lg-3 py-3 wow zoomIn">
              <div class="img-place client-img">
                <img src="../assets/img/clients/alter_sport.png" alt="" />
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 py-3 wow zoomIn">
              <div class="img-place client-img">
                <img src="../assets/img/clients/cleaning_service.png" alt="" />
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 py-3 wow zoomIn">
              <div class="img-place client-img">
                <img src="../assets/img/clients/creative_photo.png" alt="" />
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 py-3 wow zoomIn">
              <div class="img-place client-img">
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
