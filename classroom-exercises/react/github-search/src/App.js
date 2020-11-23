import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import axios from "axios";
import Search from "./components/Search";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  render() {
    return (
      <div>
        <Navbar title="Github Search" />
        <Search />
        <div className="container">
          <Users users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }

  async componentDidMount() {
    try {
      this.setState({
        loading: true,
      });
      const res = await axios.get("https://api.github.com/users");
      this.setState({
        users: res.data,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default App;
