import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import axios from "axios";
import Search from "./components/Search";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";
import User from "./components/User";
import Dummy from "./components/Dummy";
import DummyHooks from "./components/DummyHooks";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        setLoading(true);
        const res = await axios.get("https://api.github.com/users");
        setUsers(res.data);
        setLoading(false);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Search for a username
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    setUser(res.data.items);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
  };

  // Show alert message
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Get single user data
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
  };

  // Get user repo
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    setRepos(res.data);
    setLoading(false);
  };

  return (
    <Router>
      <div>
        <Navbar title="Github Search" />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={showAlert}
                  />
                  <Users users={users} loading={loading} />
                </>
              )}
            />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/dummy" render={() => <Dummy />} />
            <Route exact path="/dummyHooks" render={() => <DummyHooks />} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={getUserRepos}
                  repos={repos}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
