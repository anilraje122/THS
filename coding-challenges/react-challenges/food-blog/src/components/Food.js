import React, { Component } from "react";
import FoodItem from "./FoodItem";

class Food extends Component {
  constructor() {
    super();
    this.state = {
      foodRow1: [
        {
          id: 1,
          imgUrl: "https://www.w3schools.com/w3images/sandwich.jpg",
          title: "The Perfect Sandwich, A Real NYC Classic",
          description:
            "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
        },
        {
          id: 2,
          imgUrl: "https://www.w3schools.com/w3images/steak.jpg",
          title: "Let Me Tell You About This Steak",
          description:
            "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
        },
        {
          id: 3,
          imgUrl: "https://www.w3schools.com/w3images/cherries.jpg",
          title: "Cherries, interrupted",
          description:
            "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
        },
        {
          id: 4,
          imgUrl: "https://www.w3schools.com/w3images/wine.jpg",
          title: "Once Again, Robust Wine and Vegetable Pasta",
          description:
            "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
        },
      ],
      foodRow2: [
        {
          id: 5,
          imgUrl: "https://www.w3schools.com/w3images/popsicle.jpg",
          title: "All I Need Is a Popsicle",
          description:
            "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
        },
        {
          id: 6,
          imgUrl: "https://www.w3schools.com/w3images/salmon.jpg",
          title: "Salmon For Your Skin",
          description:
            "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
        },
        {
          id: 7,
          imgUrl: "https://www.w3schools.com/w3images/croissant.jpg",
          title: "Le French",
          description:
            "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
        },
        {
          id: 8,
          imgUrl: "https://www.w3schools.com/w3images/sandwich.jpg",
          title: "The Perfect Sandwich, A Real NYC Classic",
          description:
            "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
        },
      ],
    };
  }

  render() {
    return (
      <>
        <div className="w3-row-padding w3-padding-16 w3-center" id="food">
          {this.state.foodRow1.map((item) => {
            return <FoodItem food={item} key={item.id} />;
          })}
        </div>
        <div className="w3-row-padding w3-padding-16 w3-center">
          {this.state.foodRow2.map((item) => {
            return <FoodItem food={item} key={item.id} />;
          })}
        </div>
        <div className="w3-center w3-padding-32">
          <div className="w3-bar">
            <a href="" className="w3-bar-item w3-button w3-hover-black">
              &laquo;
            </a>
            <a href="" className="w3-bar-item w3-black w3-button">
              1
            </a>
            <a href="" className="w3-bar-item w3-button w3-hover-black">
              2
            </a>
            <a href="" className="w3-bar-item w3-button w3-hover-black">
              3
            </a>
            <a href="" className="w3-bar-item w3-button w3-hover-black">
              4
            </a>
            <a href="" className="w3-bar-item w3-button w3-hover-black">
              &raquo;
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Food;
