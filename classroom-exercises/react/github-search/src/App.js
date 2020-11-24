import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import axios from "axios";
import Search from "./components/Search";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

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

  searchUsers = async (text) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    this.setState({
      users: res.data.items,
      loading: false,
    });
  };

  clearUsers = () => {
    this.setState({
      users: [],
    });
  };

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type,
      },
    });
    setTimeout(() => {
      this.setState({
        alert: null,
      });
    }, 3000);
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar title="Github Search" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      users={this.state.users}
                      loading={this.state.loading}
                    />
                  </>
                )}
              />
              <Route exact path="/about" render={() => <About />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
