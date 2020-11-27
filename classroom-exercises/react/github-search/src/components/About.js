import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super();
    this.state = {
      fname: "",
      lname: "",
      password: "",
    };
  }
  render() {
    return (
      <>
        <h1>React Forms</h1>
        <p>This is s form submission in React and Express</p>
        <div className="card">
          <form action="/action_page.php">
            <label for="fname">First name</label>
            <input type="text" name="fname" />
            <label for="lname">Last name</label>
            <input type="text" name="lname" />
            <label for="password">Password</label>
            <input type="password" name="password" />
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        </div>
      </>
    );
  }
}

export default About;
