import React, { Component } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

export default class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;
    const loading = this.props.loading;
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <div>
          <h1>{name}</h1>
          <p>{bio}</p>
          <p>{followers}</p>
          <p>{following}</p>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link to="/" className="btn btn-dark">
            Back to Search
          </Link>
        </div>
      </>
    );
  }
}
