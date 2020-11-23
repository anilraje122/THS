import React, { Component } from "react";

class Search extends Component {
  state = {
    text: "",
  };
  onChange = (e) => {
    console.log(e.target.value);
    this.setState({
      text: e.target.value,
    });
  };
  render() {
    console.log(this.state.text);
    return (
      <div class="container">
        <form className="form">
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
      </div>
    );
  }
}

export default Search;
