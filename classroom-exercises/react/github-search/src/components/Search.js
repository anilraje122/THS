import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  state = {
    text: "",
  };

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({
      text: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (!this.state.text) {
      this.props.setAlert("Enter github username", "danger");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({
        text: "",
      });
    }

    e.preventDefault();
  };

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div className="container">
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Github User"
            value={this.state.text}
            onChange={this.onChange}
          ></input>
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          ></input>
        </form>
        {showClear && (
          <input
            type="submit"
            value="Clear"
            className="btn btn-danger btn-block"
            onClick={clearUsers}
          ></input>
        )}
      </div>
    );
  }
}

export default Search;
