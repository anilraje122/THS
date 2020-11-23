import React from "react";
import spinner from "./spinner.gif";

function Loading() {
  return (
    <img
      src={spinner}
      alt="Loading.."
      style={{ width: 200, margin: "auto", display: "block" }}
    ></img>
  );
}

export default Loading;
