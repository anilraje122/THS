// Difference between RFC, RCC and Hooks

import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super();
    this.state = {
      fname: "",
      lname: "",
      password: "",
      gender: "",
      dob: "",
      location: "",
      tos: false,
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  onChange = (e) => {
    // set tos state
    if (e.target.name === "tos") {
      this.setState({
        [e.target.name]: e.target.checked,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  render() {
    return (
      <>
        <h1>React Forms</h1>
        <p>This is s form submission in React and Express</p>
        <div className="card">
          <form action="/action_page.php" onSubmit={this.onSubmit}>
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              name="fname"
              onChange={this.onChange}
              value={this.state.fname}
            />
            <label htmlFor="lname">Last name</label>
            <input
              type="text"
              name="lname"
              onChange={this.onChange}
              value={this.state.lname}
            />
            <label>Gender</label>
            <br />
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={this.onChange}
            />
            <label htmlFor="male"> Male </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={this.onChange}
            />
            <label htmlFor="female"> Female </label>
            <br />
            <br />
            <label for="dob">Date of birth</label>
            <input
              type="date"
              name="dob"
              value={this.state.dob}
              onChange={this.onChange}
            ></input>
            <label for="location">Location</label>
            <select
              name="location"
              style={{ marginTop: 20 }}
              value={this.state.location}
              onChange={this.onChange}
            >
              <option value="">- Select City -</option>
              <option value="Banglore">Bangalore</option>
              <option value="Kochi">Kochi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Delhi">Delhi</option>
            </select>
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
            />
            <input
              type="checkbox"
              name="tos"
              value={this.state.tos}
              onChange={this.onChange}
            />
            <label for="tos"> I agree with terms and conditions</label>
            <br />
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        </div>
      </>
    );
  }
}

export default About;
