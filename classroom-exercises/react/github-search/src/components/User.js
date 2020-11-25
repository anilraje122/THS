import React, { Component } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Repos from "./Repos";

export default class User extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
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
      company,
    } = this.props.user;
    const loading = this.props.loading;
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <div style={{ marginBottom: 20 }}>
          <Link to="/" className="btn btn-dark">
            Back to Search
          </Link>
        </div>
        Hireable{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-check text-success" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt=""
              className="round-img"
              style={{ width: 200 }}
            />
            <h1>{name}</h1>
            <p>Location : {location}</p>
          </div>
          <div>
            {bio && (
              <>
                <h2>Bio</h2>
                <p>{bio}</p>
              </>
            )}
            <br />
            <a
              href={html_url}
              className="btn btn-dark"
              target="_blank"
              rel="noreferrer"
            >
              Visit Github Profile
            </a>
            <ul style={{ marginTop: 20 }}>
              <li>
                {login && (
                  <>
                    <b>Usernane : </b> {login}
                  </>
                )}
              </li>
              <li>
                {login && (
                  <>
                    <b>Company : </b> {company}
                  </>
                )}
              </li>
              <li>
                {login && (
                  <>
                    <b>Blog : </b> {blog}
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-primary">
            Public Repos: {public_repos}
          </div>
          <div className="badge badge-primary" style={{ marginBottom: 20 }}>
            Public Gists: {public_gists}
          </div>
        </div>
        <Repos repos={this.props.repos} />
      </>
    );
  }
}
