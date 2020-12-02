import React, { useState } from "react";
import PropTypes from "prop-types";

function Search({ searchUsers, showAlert, showClear, clearUsers }) {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    if (!text) {
      showAlert("Enter github username", "danger");
    } else {
      searchUsers(text);
      this.setState({
        text: "",
      });
    }

    e.preventDefault();
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Github User"
          value={text}
          onChange={onChange}
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

Search.protoTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Search;
