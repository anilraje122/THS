import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
  };

  render() {
    console.log(this.state.users);
    return (
      <div>
        <Navbar title="Github Search" />
        <div className="container">
          <Users users={this.state.users} />
        </div>
      </div>
    );
  }

  async componentDidMount() {
    try {
      const res = await axios.get("https://api.github.com/users");
      this.setState({
        users: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default App;
