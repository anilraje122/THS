import React, { Component } from "react";

class FoodItem extends Component {
  render() {
    const { imgUrl, title, description } = this.props.food;
    return (
      <div className="w3-quarter">
        <img src={imgUrl} alt="food" style={{ width: "100%" }} />
        <h3>{title}</h3>
        <p>{description} </p>
      </div>
    );
  }
}

export default FoodItem;
